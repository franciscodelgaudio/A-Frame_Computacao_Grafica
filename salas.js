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

        <!-- Vidro (transparent) -->
        <a-box id="vidro-celebracao-2025"
          position="0 1.8 0"
          width="1.2"
          height="2.4"
          depth="1.2"
          color="#FFFFFF"
          material="opacity: 0.12; transparent: true; metalness: 0.1; roughness: 0.3">
        </a-box>

        <!-- Troféu (começa abaixo do chão para subir) -->
        <a-gltf-model id="trofeu-2025" src="#br-libertadores" position="0 -1 0" rotation="0 90 0" scale="0.06 0.06 0.06"></a-gltf-model>

        <!-- Plaquinha -->
        <a-plane id="placa-2025" position="-0.8 1.2 0" rotation="0 -90 0" width="1" height="0.50" color="#C00000"></a-plane>
        <a-text value="2025" position="-0.8 1.2 0" rotation="0 -90 0" align="center" width="4" color="#ffffffff"></a-text>
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
          position="0 4 0"
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
          position="0 4 0"
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

AFRAME.registerComponent('celebracao-2025', {
  schema: {
    autoStart: { type: 'boolean', default: true },
    riseDur: { type: 'number', default: 6000 },
    confettiCount: { type: 'number', default: 60 },
    confettiDur: { type: 'number', default: 6000 },
    sweepDur: { type: 'number', default: 3000 }
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    const trofeu = el.querySelector('#trofeu-2025');
    const area = el.querySelector('#area-celebracao-2025');

    if (!trofeu || !area) return;

    // Limpa luzes antigas caso existam
    function clearOldSpots() {
      const old = area.querySelectorAll('.sky-spot');
      old.forEach(o => o.parentNode.removeChild(o));
    }

    // Cria um holofote NO TETO (Sky Spot)
    function createSkySpot(opts) {
      const {
        pos = {x: 2, y: 6, z: 2}, // Posição alta (Teto)
        lookAtPoint = {x: 0, y: 1.5, z: 0}, // Para onde ele aponta (o troféu)
        color = '#ffffff',
        intensity = 0.8,
        sweepAxis = 'x', // Eixo que vai balançar ('x' ou 'z')
        sweepAmp = 15,   // Amplitude do balanço em graus
        dur = 3000
      } = opts;

      // 1. Container do Holofote (Fixo no teto)
      const container = document.createElement('a-entity');
      container.classList.add('sky-spot');
      container.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);

      // 2. Pivô de Rotação (Calculamos a rotação inicial para olhar pro troféu)
      // Truque simples: Usamos look-at logic simplificada ou rotação manual.
      // Vamos criar um 'wrapper' que aponta para o centro, e o filho anima.
      const pivot = document.createElement('a-entity');
      
      // Matemática básica para apontar o objeto para o alvo (lookAt manual simples)
      // Como estamos no A-Frame, vamos configurar o pivot para olhar para o alvo.
      // Mas para facilitar a animação, vamos configurar a rotação base manualmente:
      // Se estou na direita (X+), giro Z para esquerda. Se estou na frente (Z+), giro X para trás.
      
      // Configuração visual do feixe
      const coneHeight = 8; // Feixe bem longo saindo do teto
      
      // Cria a luz
      const light = document.createElement('a-entity');
      light.setAttribute('light', `type: spot; color: ${color}; intensity: ${intensity}; angle: 18; penumbra: 0.5; castShadow: false; distance: 15`);
      
      // Cria o cone visível (feixe)
      const cone = document.createElement('a-entity');
      cone.setAttribute('geometry', `primitive: cone; radiusTop: 0.1; radiusBottom: 1.5; height: ${coneHeight}; segmentsRadial: 32`);
      cone.setAttribute('material', `color: ${color}; transparent: true; opacity: 0.12; shader: flat; side: double; depthWrite: false`);
      // O cone nativo aponta pra Y+, giramos -90 no X para apontar pra baixo/frente junto com o spot
      cone.setAttribute('rotation', '-90 0 0');
      cone.setAttribute('position', `0 0 -${coneHeight/2}`); // Empurra pra frente pra ponta sair da origem

      // Adiciona luz e cone ao pivô
      pivot.appendChild(light);
      pivot.appendChild(cone);

      // --- APONTAR PARA O TROFÉU ---
      // Para simplificar, usamos o 'look-at' nativo do A-Frame via atributo se disponível, 
      // ou setamos a rotação inicial do container para olhar para 0,1.5,0.
      container.setAttribute('look-at', `${lookAtPoint.x} ${lookAtPoint.y} ${lookAtPoint.z}`);
      // Nota: Se não tiver o componente look-at externo, o container ficaria reto.
      // Assumindo sem bibliotecas externas, vamos forçar uma rotação aproximada baseada na posição:
      // (Isso é um fallback manual para garantir que funcione sem imports extras)
      const dx = lookAtPoint.x - pos.x;
      const dy = lookAtPoint.y - pos.y;
      const dz = lookAtPoint.z - pos.z;
      const rotY = Math.atan2(dx, dz) * (180/Math.PI); 
      const distH = Math.sqrt(dx*dx + dz*dz);
      const rotX = Math.atan2(distH, dy) * (180/Math.PI) - 180; // Ajuste para apontar pra baixo
      
      // Aplicamos a rotação estática no Container para ele "Mirar" no troféu
      container.setAttribute('rotation', `${-rotX} ${rotY + 180} 0`); // Ajuste empírico padrão A-Frame

      // --- ANIMAÇÃO DE SWEEP (VAI E VEM) ---
      // Animamos o PIVÔ, que é filho do container já rotacionado.
      // Assim o "vai e vem" é relativo à mira.
      const axis = sweepAxis === 'x' ? 'rotation.x' : 'rotation.y'; 
      // Se o container já olha pro troféu, balançar em X faz o feixe subir/descer, em Y faz esquerda/direita.
      
      // Vamos balançar levemente em Y (esquerda/direita relativo ao feixe)
      pivot.setAttribute('animation__sweep', {
        property: 'rotation',
        from: `0 -${sweepAmp} 0`,
        to: `0 ${sweepAmp} 0`,
        dur: dur,
        dir: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      // Animação de pulso
      light.setAttribute('animation__pulse', {
        property: 'light.intensity',
        from: intensity * 0.7,
        to: intensity * 1.3,
        dur: dur * 0.3,
        dir: 'alternate',
        loop: true,
        easing: 'linear'
      });

      container.appendChild(pivot);
      area.appendChild(container); // Anexa à área (fixo no mundo), não ao troféu
    }

    const executarCelebracao = () => {
      // 1. Sobe o Troféu (mantido)
      const posAtual = trofeu.getAttribute('position') || {x:0, y:-1, z:0};
      trofeu.removeAttribute('animation__rise');
      trofeu.setAttribute('animation__rise', {
        property: 'position',
        to: `${posAtual.x || 0} 1.8 ${posAtual.z || 0}`,
        dur: data.riseDur,
        easing: 'easeOutQuart',
        loop: false
      });

      // Pulso do troféu
      trofeu.removeAttribute('animation__beat');
      trofeu.setAttribute('animation__beat', {
        property: 'scale',
        from: '0.06 0.06 0.06',
        to: '0.065 0.065 0.065',
        dur: 500,
        dir: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      // 2. Luzes do Céu
      clearOldSpots();

      // Luz Esquerda (Vermelha)
      createSkySpot({
        pos: {x: -3, y: 7, z: 2},
        color: '#ff0000',
        intensity: 1.5,
        sweepAmp: 10,
        dur: 2500
      });

      // Luz Direita (Branca)
      createSkySpot({
        pos: {x: 3, y: 7, z: 2},
        color: '#ffffff',
        intensity: 1.2,
        sweepAmp: 10,
        dur: 3000
      });

      // Luz Central Traseira (Dourada/Amarela - Contraluz)
      createSkySpot({
        pos: {x: 0, y: 6, z: -3},
        color: '#ffcc00',
        intensity: 1.0,
        sweepAmp: 20,
        dur: 4000
      });

      // 3. Confetes
      spawnConfetti(area, trofeu, data.confettiCount, data.confettiDur);
    };

    if (data.autoStart) setTimeout(executarCelebracao, 1000);

    trofeu.classList.add('clickable');
    trofeu.addEventListener('click', () => {
      trofeu.setAttribute('position', {x: 0, y: -1, z: 0});
      setTimeout(executarCelebracao, 100);
    });

    // Função de confetes (Compacta)
    function spawnConfetti(parent, centerRef, count, dur) {
        for (let i = 0; i < count; i++) {
         const p = document.createElement('a-plane');
         const colors = ['#C00000', '#000000', '#FFFFFF'];
         const color = colors[Math.floor(Math.random() * colors.length)];
         const x = (Math.random() - 0.5) * 5;
         const z = (Math.random() - 0.5) * 5;
         const y = 5; 
         p.setAttribute('position', `${x} ${y} ${z}`);
         p.setAttribute('material', `color: ${color}; side:double; transparent:true`);
         p.setAttribute('width', '0.06'); p.setAttribute('height', '0.03');
         p.setAttribute('animation__fall', {
             property: 'position', to: `${x + (Math.random()-0.5)} 0 ${z + (Math.random()-0.5)}`,
             dur: dur + Math.random()*2000, easing: 'linear'
         });
         p.setAttribute('animation__spin', {
             property: 'rotation', to: `${Math.random()*360} ${Math.random()*360} 0`,
             dur: 2000, loop: true, easing: 'linear'
         });
         parent.appendChild(p);
         setTimeout(() => { if(p.parentNode) p.parentNode.removeChild(p) }, dur + 3000);
        }
    }
  }
});



