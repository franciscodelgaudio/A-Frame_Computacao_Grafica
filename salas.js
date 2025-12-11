AFRAME.registerComponent("spot-real", {
  schema: {
    color: { default: "#ffffffff" },
    intensity: { default: 30 },
    angle: { default: 1 },      // largura do cone (radianos)
    penumbra: { default: 0.3 },
    distance: { default: 20 }
  },
  init() {
    const data = this.data;

    const spot = new THREE.SpotLight(
      new THREE.Color(data.color),
      data.intensity,
      data.distance,
      data.angle,
      data.penumbra
    );

    spot.castShadow = true;
    this.el.object3D.add(spot);
    this.el.object3D.add(spot.target);
  }
});

AFRAME.registerComponent('confetti-fall', {
  schema: {
    count: { type: 'int', default: 80 },
    radius: { type: 'number', default: 1.2 },   // raio onde surgem os confetes
    height: { type: 'number', default: 2.2 },   // altura do spawn
    floorY: { type: 'number', default: 0 },
    colors: { type: 'string', default: '#ff0044,#00ff66,#ffd700,#00aaff,#ff66ff' }
  },

  init() {
    const data = this.data;
    const el = this.el;

    const colorList = data.colors.split(',').map(c => c.trim());
    this.items = [];

    for (let i = 0; i < data.count; i++) {
      const c = document.createElement('a-plane');

      c.setAttribute('width', 0.08);
      c.setAttribute('height', 0.05);
      c.setAttribute('material', `color: ${colorList[i % colorList.length]}; side: double; transparent: true; shader: flat`);

      // posição inicial
      const x = (Math.random() - 0.5) * data.radius * 2;
      const y = Math.random() * data.height + 1;
      const z = (Math.random() - 0.5) * data.radius * 2;

      c.object3D.position.set(x, y, z);

      el.appendChild(c);

      this.items.push({
        el: c,
        vy: -(0.4 + Math.random() * 1.2),   // velocidade vertical
        rx: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2
      });
    }
  },

  tick(time, delta) {
    const dt = Math.min(delta, 50) / 1000;

    for (const c of this.items) {
      const obj = c.el.object3D;

      obj.position.y += c.vy * dt;
      obj.rotation.x += 1.5 * dt;
      obj.rotation.z += 1.2 * dt;

      // reinicia ao cair abaixo do chão
      if (obj.position.y < this.data.floorY) {
        obj.position.y = this.data.height + 1;
        obj.position.x = (Math.random() - 0.5) * this.data.radius * 2;
        obj.position.z = (Math.random() - 0.5) * this.data.radius * 2;
      }
    }
  }
});

AFRAME.registerComponent('transparent-no-depth', {
  schema: { doubleSide: { type: 'boolean', default: true }, alphaTest: { type: 'number', default: 0 } },

  init() {
    // aguardar o mesh estar disponível
    this.el.addEventListener('object3dset', () => this.fixMaterial());
    // também tentar imediatamente caso já tenha mesh
    setTimeout(() => this.fixMaterial(), 0);
  },

  fixMaterial() {
    const mesh = this.el.getObject3D('mesh') || this.el.getObject3D('object3D');
    if (!mesh) return;
    mesh.traverse(node => {
      if (node.isMesh && node.material) {
        // não escrever no depth buffer para não bloquear objetos atrás
        node.material.depthWrite = false;
        // deixar transparente (caso não esteja)
        node.material.transparent = true;
        // opcional: forçar double side para evitar faces viradas
        if (this.data.doubleSide) node.material.side = THREE.DoubleSide;
        // opcional: alphaTest para cortar pixels muito transparentes (ajuste se quiser)
        if (this.data.alphaTest > 0) node.material.alphaTest = this.data.alphaTest;
        // atualizar
        node.material.needsUpdate = true;
      }
    });
  }
});
//   schema: {
//     target: { type: 'selector' }, // camera selector (default: the component's entity if not provided)
//     autoStart: { type: 'boolean', default: false },
//     loop: { type: 'boolean', default: false },
//     defaultDuration: { type: 'int', default: 3000 } // ms
//   },

//   init: function () {
//     // state
//     this.isPlaying = false;
//     this.currentIndex = 0;
//     this._raf = null;
//     this._startTime = null;
//     this._from = null;
//     this._to = null;
//     this._duration = 0;
//     this._pausedElapsed = 0;

//     // delay init until scene and objects are ready
//     this.sceneEl = this.el.sceneEl || this.el.closest('a-scene');
//     if (!this.sceneEl) {
//       console.warn('[camera-tour] scene not found. Aborting init.');
//       return;
//     }

//     // wait for scene loaded (ensures assets and object3D created)
//     if (!this.sceneEl.hasLoaded) {
//       this.sceneEl.addEventListener('loaded', () => this._finishInit());
//     } else {
//       this._finishInit();
//     }
//   },

//   _finishInit: function () {
//     // resolve camera element (target) as soon as possible
//     this.cameraEl = this.data.target || this.el;

//     // if target selector given but not yet present, try again when object3dset
//     if (!this.cameraEl) {
//       console.warn('[camera-tour] target selector did not resolve, using controller entity as camera target.');
//       this.cameraEl = this.el;
//     }

//     // gather points (if none found, log and do nothing)
//     this.points = Array.from(this.el.querySelectorAll('.tourpoint'));
//     if (!this.points.length) {
//       console.warn('[camera-tour] no .tourpoint elements found as children of controller.');
//     }

//     // build waypoints safely (tolerate missing attrs)
//     this.waypoints = this.points.map(p => {
//       const posAttr = p.getAttribute('position') || { x: 0, y: 1.6, z: 0 };
//       const rotAttr = p.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
//       const duration = parseInt(p.getAttribute('data-duration')) || this.data.defaultDuration;
//       return {
//         position: { x: parseFloat(posAttr.x), y: parseFloat(posAttr.y), z: parseFloat(posAttr.z) },
//         rotation: { x: parseFloat(rotAttr.x), y: parseFloat(rotAttr.y), z: parseFloat(rotAttr.z) },
//         duration
//       };
//     });

//     // saved controls (may be undefined)
//     try {
//       this._savedControls = {
//         wasd: this.cameraEl.getAttribute('wasd-controls'),
//         look: this.cameraEl.getAttribute('look-controls')
//       };
//     } catch (err) {
//       this._savedControls = { wasd: null, look: null };
//     }

//     // if autoStart requested, start after camera object3D is ready
//     if (this.data.autoStart) {
//       // ensure camera object3D exists before start
//       if (this.cameraEl.object3D) {
//         setTimeout(() => this.start(), 0);
//       } else {
//         // wait for camera's object3dset (useful when camera is created later)
//         this.cameraEl.addEventListener('object3dset', () => {
//           setTimeout(() => this.start(), 0);
//         });
//       }
//     }

//     // debug helper: allow starting from console
//     console.info('[camera-tour] initialized. Waypoints:', this.waypoints.length);
//     this.el.addEventListener('tourstart', () => console.log('[camera-tour] tourstart'));
//     this.el.addEventListener('tourarrive', e => console.log('[camera-tour] arrived at', e.detail));
//     this.el.addEventListener('tourstep', e => {/* quiet by default */});
//   },

//   remove: function () {
//     this.stop();
//     if (this._savedControls) {
//       // restore saved controls (safe set)
//       if (this._savedControls.wasd !== undefined) {
//         this.cameraEl.setAttribute('wasd-controls', this._savedControls.wasd);
//       }
//       if (this._savedControls.look !== undefined) {
//         this.cameraEl.setAttribute('look-controls', this._savedControls.look);
//       }
//     }
//   },

//   /* Public API */
//   start: function () {
//     if (!this.waypoints || !this.waypoints.length) {
//       console.warn('[camera-tour] no waypoints to start.');
//       return;
//     }

//     // ensure camera object3D exists
//     if (!this.cameraEl.object3D) {
//       console.warn('[camera-tour] camera.object3D not ready yet — delaying start.');
//       this.cameraEl.addEventListener('object3dset', () => this.start(), { once: true });
//       return;
//     }

//     // disable movement controls (safe-set)
//     try {
//       this.cameraEl.setAttribute('wasd-controls', 'enabled: false');
//       this.cameraEl.setAttribute('look-controls', 'enabled: false');
//     } catch (err) { /* ignore */ }

//     this.currentIndex = 0;
//     this._playStep(this.currentIndex);
//     this.el.emit('tourstart', { index: this.currentIndex });
//   },

//   stop: function () {
//     this.isPlaying = false;
//     if (this._raf) cancelAnimationFrame(this._raf);
//     this._raf = null;
//     // restore controls (safe)
//     try {
//       if (this._savedControls && this._savedControls.wasd !== undefined) {
//         this.cameraEl.setAttribute('wasd-controls', this._savedControls.wasd);
//       } else {
//         this.cameraEl.setAttribute('wasd-controls', 'enabled: true');
//       }
//       if (this._savedControls && this._savedControls.look !== undefined) {
//         this.cameraEl.setAttribute('look-controls', this._savedControls.look);
//       } else {
//         this.cameraEl.setAttribute('look-controls', 'enabled: true');
//       }
//     } catch (err) { /* ignore */ }
//     this.el.emit('tourstop', {});
//   },

//   pause: function () {
//     if (!this.isPlaying) return;
//     this.isPlaying = false;
//     if (this._raf) cancelAnimationFrame(this._raf);
//     this._raf = null;
//     this._pausedElapsed = performance.now() - this._startTime;
//     this.el.emit('tourpause', { index: this.currentIndex, elapsed: this._pausedElapsed });
//   },

//   resume: function () {
//     if (this.isPlaying) return;
//     if (!this._from || !this._to) return;
//     const remaining = Math.max(0, this._duration - this._pausedElapsed);
//     this._startInterpolation(performance.now(), remaining, this._from, this._to, this.currentIndex);
//     this.el.emit('tourresume', { index: this.currentIndex });
//   },

//   next: function () {
//     this._clearRaf();
//     const nextIndex = (this.currentIndex + 1) % this.waypoints.length;
//     if (!this.data.loop && nextIndex === 0 && this.currentIndex === this.waypoints.length - 1) {
//       this.el.emit('tourend', {});
//       this.stop();
//       return;
//     }
//     this._playStep(nextIndex);
//   },

//   prev: function () {
//     this._clearRaf();
//     const prevIndex = (this.currentIndex - 1 + this.waypoints.length) % this.waypoints.length;
//     this._playStep(prevIndex);
//   },

//   goTo: function (index) {
//     if (index < 0 || index >= this.waypoints.length) return;
//     this._clearRaf();
//     this._playStep(index);
//   },

//   /* Internal helpers */
//   _playStep: function (index) {
//     this.currentIndex = index;
//     const wp = this.waypoints[index];
//     if (!wp) {
//       console.warn('[camera-tour] waypoint missing for index', index);
//       return;
//     }

//     // ensure camera.object3D available
//     if (!this.cameraEl.object3D) {
//       console.warn('[camera-tour] camera.object3D not available when trying to play step. Waiting...');
//       this.cameraEl.addEventListener('object3dset', () => this._playStep(index), { once: true });
//       return;
//     }

//     const obj = this.cameraEl.object3D;
//     const fromPos = obj.position.clone();
//     const fromQuat = obj.quaternion.clone();

//     const toPos = new THREE.Vector3(wp.position.x, wp.position.y, wp.position.z);
//     // convert degrees to radians Euler and then to quaternion (use MathUtils)
//     const euler = new THREE.Euler(
//       (THREE.MathUtils && THREE.MathUtils.degToRad ? THREE.MathUtils.degToRad(wp.rotation.x || 0) : (wp.rotation.x || 0) * Math.PI / 180),
//       (THREE.MathUtils && THREE.MathUtils.degToRad ? THREE.MathUtils.degToRad(wp.rotation.y || 0) : (wp.rotation.y || 0) * Math.PI / 180),
//       (THREE.MathUtils && THREE.MathUtils.degToRad ? THREE.MathUtils.degToRad(wp.rotation.z || 0) : (wp.rotation.z || 0) * Math.PI / 180),
//       'XYZ'
//     );
//     const toQuat = new THREE.Quaternion().setFromEuler(euler);

//     this._from = { pos: fromPos, quat: fromQuat };
//     this._to = { pos: toPos, quat: toQuat };
//     this._duration = wp.duration || this.data.defaultDuration;
//     this._pausedElapsed = 0;

//     this._startInterpolation(performance.now(), this._duration, this._from, this._to, index);
//   },

//   _startInterpolation: function (startTime, duration, from, to, index) {
//     this.isPlaying = true;
//     this._startTime = startTime;
//     this._duration = duration;

//     const animate = (now) => {
//       const elapsed = now - this._startTime;
//       let t = Math.min(1, elapsed / Math.max(1, this._duration));
//       const eased = this._easeInOutCubic(t);

//       // position lerp
//       const currentPos = from.pos.clone().lerp(to.pos, eased);
//       // rotation slerp
//       const currentQuat = new THREE.Quaternion();
//       THREE.Quaternion.slerp(from.quat, to.quat, currentQuat, eased);

//       // apply to camera object3D
//       try {
//         this.cameraEl.object3D.position.copy(currentPos);
//         this.cameraEl.object3D.quaternion.copy(currentQuat);
//       } catch (err) {
//         console.error('[camera-tour] failed to apply position/quaternion', err);
//         this.stop();
//         return;
//       }

//       this.el.emit('tourstep', { index, progress: t });

//       if (t < 1 && this.isPlaying) {
//         this._raf = requestAnimationFrame(animate);
//       } else {
//         // ensure final exact values
//         try {
//           this.cameraEl.object3D.position.copy(to.pos);
//           this.cameraEl.object3D.quaternion.copy(to.quat);
//         } catch (err) { /* ignore */ }

//         this._raf = null;
//         this.isPlaying = false;
//         this.el.emit('tourarrive', { index });

//         // next
//         const nextIndex = index + 1;
//         if (nextIndex < this.waypoints.length) {
//           setTimeout(() => this._playStep(nextIndex), 50);
//         } else if (this.data.loop) {
//           setTimeout(() => this._playStep(0), 50);
//         } else {
//           this.el.emit('tourend', {});
//           // restore controls
//           try {
//             if (this._savedControls && this._savedControls.wasd !== undefined) {
//               this.cameraEl.setAttribute('wasd-controls', this._savedControls.wasd);
//             } else {
//               this.cameraEl.setAttribute('wasd-controls', 'enabled: true');
//             }
//             if (this._savedControls && this._savedControls.look !== undefined) {
//               this.cameraEl.setAttribute('look-controls', this._savedControls.look);
//             } else {
//               this.cameraEl.setAttribute('look-controls', 'enabled: true');
//             }
//           } catch (err) { /* ignore */ }
//         }
//       }
//     };

//     this._raf = requestAnimationFrame(animate);
//   },

//   _clearRaf: function () {
//     if (this._raf) {
//       cancelAnimationFrame(this._raf);
//       this._raf = null;
//     }
//     this.isPlaying = false;
//   },

//   _easeInOutCubic: function (t) {
//     return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
//   }
// });

AFRAME.registerComponent("sala-libertadores", {
  init() {
    const el = this.el;

    el.innerHTML = `

      <!-- Paredes -->
      <a-box position="0 2 -10" depth="0.2" height="8" width="10" color="#222222"></a-box>
      <a-box position="-5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>
      <a-box position="5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>

      <!-- Faixas rubro-negras -->
      <a-box position="0 1.5 -9.9" depth="0.05" height="0.8" width="9.8" color="#C00000"></a-box>
      <a-box position="-4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>
      <a-box position="4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>

       <!-- LADO ESQUERDO (1980, 1982, 1983, 1987) - virados para o centro (rotação Y = 90) -->

      <!-- 1981 -->
      <a-entity position="-4 0 -6">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="5"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-libertadores"
          position="0 1.8 0"
          rotation="0 90 0"
          scale="0.06 0.06 0.06">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1981" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Zico) -->
        <a-image
          src="zico.jpg"
          position="-0.89 4 2"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2019 -->
      <a-entity position="4 0 -6" rotation="0 180 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="5"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-libertadores"
          position="0 1.8 0"
          rotation="0 90 0"
          scale="0.06 0.06 0.06">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2019" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <a-image
          src="gabigol.jpg"
          position="-0.89 4 -2"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- FIM DO CORREDOR - 2025 NO CENTRO -->

      <!-- 2022 -->
      <a-entity position="0 0 -8" rotation="0 90 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="5"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-libertadores"
          position="0 1.8 0"
          rotation="0 90 0"
          scale="0.06 0.06 0.06">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.50" color="#C00000"></a-plane>
        <a-text value="2022" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo -->
        <a-image
          src="gabigol.jpg"
          position="1.89 4 0"
          rotation="0 90 0"
          width="3.2"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2025 - CELEBRAÇÃO -->
      <a-entity id="area-celebracao-2025" position="0 0 -3" rotation="0 90 0">
        <!-- Pedestal (mesa) -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="5"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu (começa abaixo do chão para subir) -->
        <a-entity position="0 3 0" spot-real id="spot-real_um">
          <a-cone
            radius-bottom="3"
            radius-top="0.05"
            height="10"
            position="0 0 1"
            rotation="20 0 0"
            transparent-no-depth
            material="color: #ffffffff; opacity: 0.1; transparent: true; emissive: #ffffffff; emissiveIntensity: 0.1">
          </a-cone>
        </a-entity>
        <a-entity position="0 3 0" spot-real id="spot-real_um">
          <a-cone
            radius-bottom="3"
            radius-top="0.05"
            height="10"
            position="0 0 0"
            rotation="0 0 0"
            transparent-no-depth
            material="color: #ffffffff; opacity: 0.1; transparent: true; emissive: #ffffffff; emissiveIntensity: 0.1">
          </a-cone>
        </a-entity>

        <a-entity id="confete-no-trofeu"
          position="0 1.5 0"
          confetti-fall="count: 120; radius: 1; height: 2;">
        </a-entity>
        <a-gltf-model id="trofeu-2025" src="#br-libertadores" position="0 -1 0" rotation="0 90 0" scale="0.06 0.06 0.06"></a-gltf-model>

        <a-entity position="0 3 0" spot-real id="spot-real_dois">
          <a-cone
            radius-bottom="3"
            radius-top="0.05"
            height="10"
            position="0 0 -1"
            rotation="-20 0 0"
            transparent-no-depth
            material="color: #ffffffff; opacity: 0.1; transparent: true; emissive: #ffffffff; emissiveIntensity: 0.1">
          </a-cone>
        </a-entity>

        <!-- Plaquinha -->
        <a-plane id="placa-2025" position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.50" color="#C00000"></a-plane>
        <a-text value="2025" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>
        <a-text id="tetracampeao" value="TETRACAMPEAO" position="-0.8 10 0" rotation="0 -90 0" align="center" width="50" color="#C00000"></a-text>
      </a-entity>

    `;
  }
});

AFRAME.registerComponent("sala-copadobrasil", {
  init() {
    const el = this.el;

    el.innerHTML = `
      <!-- Paredes -->
      <a-box position="0 2 -10" depth="0.2" height="8" width="10" color="#222222"></a-box>
      <a-box position="-5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>
      <a-box position="5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>

      <!-- Faixa vermelha na parede do fundo -->
      <a-box position="0 1.5 -9.9" depth="0.05" height="0.8" width="9.8" color="#C00000"></a-box>
      <a-box position="-4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>
      <a-box position="4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>

      <!-- LADO ESQUERDO (1980, 1982, 1983, 1987) - virados para o centro (rotação Y = 90) -->

      <!-- 1990 -->
      <a-entity position="-4 0 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-copadobrasil"
          position="0 2.3 0"
          rotation="0 90 0"
          scale="0.55 0.55 0.55">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1990" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Zico) -->
        <a-image
          src="gaucho.jpg"
          position="-0.89 4 0"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2006 -->
      <a-entity position="-4 0 -3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-copadobrasil"
          position="0 2.3 0"
          rotation="0 90 0"
          scale="0.55 0.55 0.55">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2006" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <a-image
          src="obina.jpg"
          position="-0.89 4 0"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2013 -->
      <a-entity position="4 0 0" rotation="0 180 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-copadobrasil"
          position="0 2.3 0"
          rotation="0 90 0"
          scale="0.55 0.55 0.55">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2013" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Maestro Júnior) -->
        <a-image
          src="hernane.jpg"
          position="-0.89 4 0"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- LADO DIREITO (1992, 2009, 2019, 2020) - virados para o centro (rotação Y = -90) -->

      <!-- 2022 -->
      <a-entity position="4 0 -3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-copadobrasil"
          position="0 2.3 0"
          rotation="0 -90 0"
          scale="0.55 0.55 0.55">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2022" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Bebeto) -->
        <a-image
          src="gabigol.jpg"
          position="0.89 4 0"
          rotation="0 -90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- FIM DO CORREDOR - 2025 NO CENTRO -->

      <!-- 2024 -->
      <a-entity position="0 0 -8" rotation="0 90 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-copadobrasil"
          position="0 2.3 0"
          rotation="0 -90 0"
          scale="0.55 0.55 0.55">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.50" color="#C00000"></a-plane>
        <a-text value="2024" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo -->
        <a-image
          src="plata.jpg"
          position="1.89 4 0"
          rotation="0 90 0"
          width="3.2"
          height="2.4">
        </a-image>
      </a-entity>
    `;
  }
});

AFRAME.registerComponent("sala-brasileirao", {
  init() {
    const el = this.el;

    el.innerHTML = `

      <!-- Paredes -->
      <a-box position="0 2 -10" depth="0.2" height="8" width="10" color="#222222"></a-box>
      <a-box position="-5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>
      <a-box position="5 2 0" depth="20" height="8" width="0.2" color="#222222"></a-box>

      <!-- Faixa vermelha na parede do fundo -->
      <a-box position="0 1.5 -9.9" depth="0.05" height="0.8" width="9.8" color="#C00000"></a-box>
      <a-box position="-4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>
      <a-box position="4.9 1.5 0" depth="20" height="0.8" width="0.05" color="#C00000"></a-box>

      <!-- LADO ESQUERDO (1980, 1982, 1983, 1987) - virados para o centro (rotação Y = 90) -->

      <!-- 1980 -->
      <a-entity position="-4 0 3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="-0.6 2.1 0"
          rotation="0 0 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1980" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Zico) -->
        <a-image
          src="zico.jpg"
          position="-0.89 4 -1.5"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 1982 -->
      <a-entity position="-4 0 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="-0.6 2.1 0"
          rotation="0 0 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1982" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <a-image
          src="bebeto.jpg"
          position="-0.89 4 -2"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 1983 -->
      <a-entity position="-4 0 -3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="-0.6 2.1 0"
          rotation="0 0 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1983" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Maestro Júnior) -->
        <a-image
          src="junior.jpg"
          position="8.89 4 0"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 1987 -->
      <a-entity position="-4 0 -6">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="-0.6 2.1 0"
          rotation="0 0 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="0.8 1.2 0" rotation="0 90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1987" position="0.8 1.2 0" rotation="0 90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Maestro Júnior) -->
        <a-image
          src="didico.png"
          position="8.89 4 0"
          rotation="0 90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- LADO DIREITO (1992, 2009, 2019, 2020) - virados para o centro (rotação Y = -90) -->

      <!-- 1992 -->
      <a-entity position="4 0 3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="0.6 2.1 0"
          rotation="0 180 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="1992" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Bebeto) -->
        <a-image
          src="bebeto.jpg"
          position="1 4 0"
          rotation="0 -90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2009 -->
      <a-entity position="4 0 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="0.6 2.1 0"
          rotation="0 180 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2009" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffff"></a-text>

        <!-- Quadro do ídolo (Didico) -->
        <a-image
          src="didico.jpg"
          position="1 4 0"
          rotation="0 -90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2019 -->
      <a-entity position="4 0 -3">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="0.6 2.1 0"
          rotation="0 180 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2019" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffff"></a-text>

        <!-- Quadro do ídolo (Gabigol) -->
        <a-image
          src="gabigol.jpg"
          position="0.89 4 4"
          rotation="0 -90 0"
          width="1.8"
          height="2.4">
        </a-image>
      </a-entity>

      <!-- 2020 -->
      <a-entity position="4 0 -6">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="0.6 2.1 0"
          rotation="0 180 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.5" color="#C00000"></a-plane>
        <a-text value="2020" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (Filipe Luís) -->
        <!-- comentado no original -->
      </a-entity>

      <!-- FIM DO CORREDOR - 2025 NO CENTRO -->

      <!-- 2025 -->
      <a-entity position="0 0 -8" rotation="0 90 0">
        <!-- Mesa -->
        <a-box position="0 1 0" width="1.5" height="1.5" depth="1.5" color="#333333"></a-box>

        <!-- Vidro -->
        <a-box
          position="0 2.3 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.15; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu -->
        <a-gltf-model
          src="#br-trofeu"
          position="0.6 2.1 0"
          rotation="0 180 0"
          scale="0.18 0.18 0.18">
        </a-gltf-model>

        <!-- Plaquinha -->
        <a-plane position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.50" color="#C00000"></a-plane>
        <a-text value="2025" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>

        <!-- Quadro do ídolo (pode ser Gabigol de novo, por exemplo) -->
        <a-image
          src="filipe_luis.png"
          position="1.89 4 0"
          rotation="0 90 0"
          width="3.2"
          height="2.4">
        </a-image>
      </a-entity>
    `;
  }
});

AFRAME.registerComponent('celebracao-anim', {
  init: function () {
    const area = this.el;

    // 1) animação do troféu (subida + rotação contínua)
    const trofeu = area.querySelector('#trofeu-2025');
    if (trofeu) {
      // subida (uma vez)
      trofeu.setAttribute('animation__rise',
        'property: position; from: 0 -1 0; to: 0 1.8 0; dur: 6000; easing: easeOutElastic;');
      // rotação contínua (loop de 40s)
      trofeu.setAttribute('animation__spin',
        'property: rotation; to: 0 360 0; dur: 40000; loop: true; easing: linear;');
    }

    const spotligth_um = area.querySelector('#spot-real_um');
    if (spotligth_um) {
      // subida inicial
      spotligth_um.setAttribute('animation__rise',
        'property: position; from: 0 -1 0; to: 0 1.8 0; dur: 6000; easing: easeOutElastic;');

      // vai e vem no eixo X (ou Y/Z) já em loop
      spotligth_um.setAttribute('animation__wavex',
        'property: position; from: -1 1.8 0; to: 1 1.8 0; dur: 4000; dir: alternate; loop: true; easing: easeInOutSine;');

      // rotação contínua
      spotligth_um.setAttribute('animation__spin',
        'property: rotation; to: 0 360 0; dur: 40000; loop: true; easing: linear;');
    }

    const spotligth_dois = area.querySelector('#spot-real_dois');
    if (spotligth_dois) {
      // subida inicial
      spotligth_dois.setAttribute('animation__rise',
        'property: position; from: 0 -1 0; to: 0 1.8 0; dur: 6000; easing: easeOutElastic;');

      // vai e vem no eixo X (ou Y/Z) já em loop
      spotligth_dois.setAttribute('animation__wavex',
        'property: position; from: -1 1.8 0; to: 1 1.8 0; dur: 4000; dir: alternate; loop: true; easing: easeInOutSine;');

      // rotação contínua
      spotligth_dois.setAttribute('animation__spin',
        'property: rotation; to: 0 360 0; dur: 40000; loop: true; easing: linear;');
    }

    const tetracampeao = area.querySelector('#tetracampeao');
    if (tetracampeao) {
      tetracampeao.setAttribute('animation__pulse', `
    property: scale;
    dir: alternate;
    from: 1 1 1;
    to: 1.3 1.3 1.3;
    dur: 800;
    loop: true;
    easing: easeInOutQuad;
  `);
    }

  }
});
