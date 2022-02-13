import d from '@dominant/core';

document.head.append(d.el('style', `
  .App {
    text-align: center;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
    animation: App-logo-spin infinite 20s linear;
  }

  .App-header {
    background-color: #2f272b;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #f96161;
  }

  @keyframes App-logo-spin {
    from { transform: rotate(360deg) }
    to { transform: rotate(0deg) }
  }
`));

class App {
  render = () => (
    <div model={this} class="App">
      <header class="App-header">
        <img src="logo.svg" class="App-logo" alt="logo" />

        <p>
          Edit <code>components/App.jsx</code> and save to reload.
        </p>

        <a
          class="App-link"
          href="https://github.com/guiprav/dominant/blob/master/README.md"
          target="_blank"
        >
          Learn Dominant
        </a>
      </header>
    </div>
  );
}

export default App;