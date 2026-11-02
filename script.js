* {
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: #f7efe6;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  min-height: 100dvh;
}

/* Show vintage dotted wallpaper on tablets and desktops only */
@media (min-width: 768px) {
  body {
    background-image: 
      radial-gradient(#e5d8cb 1.5px, transparent 1.5px),
      radial-gradient(#dfd1c3 1.5px, #f7efe6 1.5px);
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
  }
}
