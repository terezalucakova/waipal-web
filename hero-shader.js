(function () {
  'use strict';

  function initHeroShader() {
    const container = document.getElementById('hero-shader');
    if (!container || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock  = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse          - 0.5 * iResolution.xy) / iResolution.y;

        float t         = iTime * 0.38;
        float mouseDist = length(uv - mouse);

        // warp effect around mouse cursor
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.22;
        warp *= smoothstep(0.65, 0.0, mouseDist);
        uv += warp;

        // grid lines
        vec2  gridUv = abs(fract(uv * 10.0) - 0.5);
        float line   = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        // Waipal navy base + blue grid (#0F1A3C + #1B4FD8)
        vec3 bg        = vec3(0.059, 0.102, 0.235);
        vec3 gridColor = vec3(0.106, 0.310, 0.847);
        vec3 color     = bg + gridColor * line * (0.5 + sin(t * 2.0) * 0.42);

        // energetic pulses – lighter Waipal blue
        float energy = sin(uv.x * 20.0 + t * 7.0) * sin(uv.y * 20.0 + t * 5.0);
        energy = smoothstep(0.75, 1.0, energy);
        color += vec3(0.4, 0.65, 1.0) * energy * line * 1.4;

        // glow around mouse cursor
        float glow = smoothstep(0.22, 0.0, mouseDist);
        color += vec3(0.4, 0.65, 1.0) * glow * 1.1;

        // subtle noise grain
        color += random(uv + t * 0.1) * 0.04;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(
                       container.clientWidth  / 2,
                       container.clientHeight / 2
                     ) }
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      uniforms.iMouse.value.set(
        e.clientX - rect.left,
        container.clientHeight - (e.clientY - rect.top)
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroShader);
  } else {
    initHeroShader();
  }
}());
