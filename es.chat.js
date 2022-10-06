const doc = document;
const xmlns = 'http://www.w3.org/2000/svg';
const qSA = (selector) => doc.querySelectorAll(selector);
const $ = (q) => {
  const els = qSA(q);
  if (els.length > 1) {
    return els;
  } else if (els.length === 1) {
    return els[0];
  }
};
const cEL = (el) => doc.createElement(el);
const cElNS = (NS, el) => doc.createElementNS(NS, el);
const ESChatScript = $('script[src*="es.chat"]');
const queryString = ESChatScript.src.replace(/^[^\?]+\??/, '');
const searchParams = new URLSearchParams(queryString);
const token = searchParams.get('t') ? searchParams.get('t') : searchParams.get('token');
class ESChat {
  constructor(token) {
    this.head = $('head');
    this.body = $('body');
    this.token = token;
    this.init();
  }

  async init() {
    const req = await fetch('/static/api.json', {
      method: 'GET',
      headers: {
        'X-Widget-Token': this.token
      }
    });
    if (req.ok) {
      const data = await req.json();
      if (data.success) {
        this.config = data.payload;
        this.fontSetup();
        this.styleSetup();
        this.formContainer();
        this.render();
      } else {
        console.error(data.message);
      }
    } else {
      console.error('something went wrong');
    }
  }

  fontSetup() {
    const link = cEL('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto:400,500,600');
    this.head.appendChild(link);
  }
  styleSetup() {
    const link = cEL('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://cdn.jsdelivr.net/npm/es-chat-widget/es.chat.min.css');
    this.head.appendChild(link);
  }
  formContainer() {
    this.chatContainerEl = cEL('div');
    this.chatContainerEl.className = 'es-chat-container';
    this.formButton();
    this.formChatBox();
  }
  injectContainer() {
    this.injectButton();
    this.injectChatBox();
    this.body.appendChild(this.chatContainerEl);
  }
  formButton() {
    this.chatButtonEl = cEL('button');
    this.chatButtonEl.className = 'es-chat-iconButton';
    this.chatButtonEl.type = 'button';
    this.chatButtonEl.ariaLabel = 'Chat With Us';
    this.chatButtonEl.tabIndex = '0';
    this.formButtonVector();
  }
  injectButton() {
    this.chatContainerEl.prepend(this.chatButtonEl);
    this.injectButtonVector();
  }
  onChatButtonClick() {
    const chatBoxEl = $('.chat-box');
    const chatBoxCloudEl = $('.chat-cloud');
    const chatBoxClassList = chatBoxEl.classList;
    const chatBoxCloudClassList = chatBoxCloudEl.classList;
    chatBoxClassList.contains('show') ? chatBoxClassList.remove('show') : chatBoxClassList.add('show');
    setTimeout(() => {
      chatBoxCloudClassList.contains('show') ? chatBoxCloudClassList.remove('show') : chatBoxCloudClassList.add('show');
    }, 0);
  }
  formButtonVector() {
    this.chatButtonSvgEl = cElNS(xmlns, 'svg');
    this.chatButtonSvgEl.setAttributeNS(null, 'viewBox', '0 0 24 24');
    this.formButtonVectorPath();
  }
  injectButtonVector() {
    this.chatButtonEl.appendChild(this.chatButtonSvgEl);
    this.injectButtonVectorPath();
  }
  formButtonVectorPath() {
    this.chatButtonSvgPathEl = cElNS(xmlns, 'path');
    this.chatButtonSvgPathEl.setAttributeNS(
      null,
      'd',
      'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z'
    );
    this.chatButtonSvgPathEl.setAttributeNS(null, 'fill', this.config.colors.primary);
  }
  injectButtonVectorPath() {
    this.chatButtonSvgEl.appendChild(this.chatButtonSvgPathEl);
  }
  formChatBox() {
    this.chatBoxEl = cEL('div');
    this.chatBoxEl.classList.add('chat-box');
    this.formChatBoxHeader();
    this.formChatBoxBody();
    this.formChatBoxFooter();
  }
  injectChatBox() {
    this.injectChatBoxHeader();
    this.injectChatBoxBody();
    this.injectChatBoxFooter();
    this.chatContainerEl.prepend(this.chatBoxEl);
  }
  formChatBoxHeader() {
    this.chatBoxHeaderEl = cEL('div');
    this.chatBoxHeaderEl.style.backgroundColor = this.config.colors.secondary;
    this.chatBoxHeaderEl.classList.add('header');
    this.formChatBoxHeaderDP();
    this.formChatBoxHeaderContent();
  }
  injectChatBoxHeader() {
    this.chatBoxEl.append(this.chatBoxHeaderEl);
    this.injectChatBoxHeaderDP();
    this.injectChatBoxHeaderContent();
  }
  formChatBoxHeaderDP() {
    this.chatBoxHeaderDPWrapEl = cEL('div');
    this.chatBoxHeaderDPEl = cEL('img');
    this.chatBoxHeaderDPStatusEl = cEL('span');

    this.chatBoxHeaderDPWrapEl.classList.add('avatar');
    this.chatBoxHeaderDPStatusEl.classList.add('status');

    this.chatBoxHeaderDPEl.src = this.config.businessLogo;
    this.chatBoxHeaderDPEl.alt = 'DP';
    this.chatBoxHeaderDPEl.loading = 'lazy';
    this.chatBoxHeaderDPEl.height = 38;
    this.chatBoxHeaderDPEl.width = 38;
    this.chatBoxHeaderDPStatusEl.style.backgroundColor = this.config.colors.status[this.config.businessStatus];
  }
  injectChatBoxHeaderDP() {
    this.chatBoxHeaderDPWrapEl.append(this.chatBoxHeaderDPEl);
    this.chatBoxHeaderDPWrapEl.append(this.chatBoxHeaderDPStatusEl);
    this.chatBoxHeaderEl.append(this.chatBoxHeaderDPWrapEl);
  }
  formChatBoxHeaderContent() {
    this.chatBoxHeaderContentEl = cEL('div');
    this.chatBoxHeaderNameEl = cEL('h5');
    this.chatBoxHeaderDescEl = cEL('h6');

    this.chatBoxHeaderContentEl.classList.add('right');
    this.chatBoxHeaderNameEl.classList.add('name');
    this.chatBoxHeaderDescEl.classList.add('desc');
    this.chatBoxHeaderNameEl.style.color = this.config.colors.foreGround;
    this.chatBoxHeaderDescEl.style.color = this.config.colors.foreGround;

    this.chatBoxHeaderNameEl.innerHTML = this.config.businessName;
    this.chatBoxHeaderDescEl.innerHTML = this.config.statusText;
  }
  injectChatBoxHeaderContent() {
    this.chatBoxHeaderContentEl.append(this.chatBoxHeaderNameEl);
    this.chatBoxHeaderContentEl.append(this.chatBoxHeaderDescEl);
    this.chatBoxHeaderEl.append(this.chatBoxHeaderContentEl);
  }
  formChatBoxBody() {
    this.chatBoxBodyEl = cEL('div');
    this.chatBoxCloudEl = cEL('div');
    this.chatBoxCloudContentEl = cEL('div');
    this.chatBoxCloudSenderEl = cEL('h5');
    this.chatBoxCloudMessageEl = cEL('h6');
    this.chatBoxCloudTimeEl = cEL('h6');
    this.chatBoxBodyEl.style.backgroundColor = '#E2D7CD';
    this.chatBoxCloudSenderEl.innerHTML = this.config.businessName;
    this.chatBoxCloudMessageEl.innerHTML = this.config.welcomeMessage.replaceAll(/(?:\r\n|\r|\n)/g, '<br />');
    this.chatBoxBodyEl.classList.add('body');
    this.chatBoxCloudEl.classList.add('chat-cloud');
    this.chatBoxCloudContentEl.classList.add('content');
    this.chatBoxCloudSenderEl.classList.add('sender');
    this.chatBoxCloudMessageEl.classList.add('message');
    this.chatBoxCloudTimeEl.classList.add('time');
  }
  injectChatBoxBody() {
    this.chatBoxCloudContentEl.append(this.chatBoxCloudSenderEl);
    this.chatBoxCloudContentEl.append(this.chatBoxCloudMessageEl);
    this.chatBoxCloudContentEl.append(this.chatBoxCloudTimeEl);
    this.chatBoxCloudEl.append(this.chatBoxCloudContentEl);
    this.chatBoxBodyEl.append(this.chatBoxCloudEl);
    this.chatBoxEl.append(this.chatBoxBodyEl);
  }
  formChatBoxFooter() {
    this.chatBoxFooterEl = cEL('div');
    this.chatBoxFooterButtonEl = cEL('a');
    this.chatBoxFooterButtonIconEl = cElNS(xmlns, 'svg');
    this.chatBoxFooterButtonIconPathEl = cElNS(xmlns, 'path');
    this.chatBoxFooterButtonLabelEl = cEL('span');
    this.chatBoxFooterPoweredEl = cEL('p');
    this.chatBoxFooterButtonIconEl.setAttributeNS(null, 'viewBox', '0 0 24 24');
    this.chatBoxFooterButtonIconPathEl.setAttributeNS(
      null,
      'd',
      'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z'
    );
    this.chatBoxFooterButtonIconPathEl.setAttributeNS(null, 'fill', this.config.colors.foreGround);
    this.chatBoxFooterButtonLabelEl.innerHTML = this.config.buttonLabel;
    this.chatBoxFooterButtonEl.style.backgroundColor = this.config.colors.primary;
    this.chatBoxFooterPoweredEl.innerHTML = `POWERED BY <a href="${this.config.buttonLink}" target="_blank">EASYSOCIAL.IO</a>`;
    this.chatBoxFooterEl.classList.add('footer');
    this.chatBoxFooterButtonEl.classList.add('start-button');
    this.chatBoxFooterButtonEl.setAttribute('href', 'https://wa.me/917229970970?text=Hello');
    this.chatBoxFooterButtonEl.setAttribute('target', '_blank');
    this.chatBoxFooterButtonLabelEl.classList.add('label');
    this.chatBoxFooterPoweredEl.classList.add('powered-by');
  }
  injectChatBoxFooter() {
    this.chatBoxFooterButtonIconEl.append(this.chatBoxFooterButtonIconPathEl);
    this.chatBoxFooterButtonEl.append(this.chatBoxFooterButtonIconEl);
    this.chatBoxFooterButtonEl.append(this.chatBoxFooterButtonLabelEl);
    this.chatBoxFooterEl.append(this.chatBoxFooterButtonEl);
    this.chatBoxFooterEl.append(this.chatBoxFooterPoweredEl);
    this.chatBoxEl.append(this.chatBoxFooterEl);
  }
  render() {
    this.chatButtonEl.addEventListener('click', () => {
      $('.chat-cloud .time').innerHTML = this.time = new Date().toLocaleString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      this.onChatButtonClick();
    });
    this.chatBoxFooterButtonEl.addEventListener('click', this.onChatButtonClick);
    this.injectContainer();
  }
}
if (token) {
  new ESChat(token);
} else {
  console.error('A valid token is required');
  console.info('Provide token either in "t" or "token"');
}
