const xmlns = 'http://www.w3.org/2000/svg',
  qSA = t => document.querySelectorAll(t),
  jQ = t => {
    let o = qSA(t)
    return o.length > 1 ? o : 1 === o.length ? o[0] : void 0
  },
  cEL = t => document.createElement(t),
  cElNS = (t, o) => document.createElementNS(t, o),
  ESChatScript = jQ('script[src*="es.chat"]'),
  queryString = ESChatScript.src.replace(/^[^\?]+\??/, ''),
  searchParams = new URLSearchParams(queryString),
  token = searchParams.get('t')
    ? searchParams.get('t')
    : searchParams.get('token')
class ESChat {
  constructor (t) {
    (this.head = jQ('head')),
      (this.body = jQ('body')),
      (this.token = t),
      this.init();
  }
  async init () {
    this.fontSetup(), this.styleSetup()
    let t = await fetch(
      `https://api.easysocial.in/api/v1/whatsapp-widget/data?token=${this.token}`,
      { method: 'GET' }
    )
    if (t.ok) {
      let o = await t.json()
      o.success
        ? ((this.config = o.payload), this.formContainer(), this.render())
        : console.error(o.message)
    } else console.error('something went wrong')
  }
  fontSetup () {
    let t = cEL('link')
    t.setAttribute('rel', 'stylesheet'),
      t.setAttribute('type', 'text/css'),
      t.setAttribute(
        'href',
        'https://fonts.googleapis.com/css?family=Roboto:400,500,600'
      ),
      this.head.appendChild(t)
  }
  styleSetup () {
    let t = cEL('link')
    t.setAttribute('rel', 'stylesheet'),
      t.setAttribute('type', 'text/css'),
      t.setAttribute('href', 'https://cdn.easysocial.in/es.chat.min.css'),
      this.head.appendChild(t)
  }
  formContainer () {
    (this.chatContainerEl = cEL('div')),
      this.chatContainerEl.classList.add('es-chat-container'),
      this.chatContainerEl.classList.add(
          'left' === this.config.orientation
          ? 'es-left'
          : 'es-right'
      ),
      this.formButton(),
      this.formChatBox();
  }
  injectContainer () {
    this.injectButton(),
      this.injectChatBox(),
      this.body.appendChild(this.chatContainerEl)
  }
  formButton () {
    (this.chatButtonEl = cEL('div')),
      (this.chatButtonEl.className = 'es-chat-iconButton'),
      (this.chatButtonEl.role = 'button'),
      (this.chatButtonEl.ariaLabel = 'Chat With Us'),
      (this.chatButtonEl.tabIndex = '0'),
      this.formButtonVector();
  }
  injectButton () {
    this.chatContainerEl.prepend(this.chatButtonEl), this.injectButtonVector()
  }
  onChatButtonClick () {
    let t = jQ('.es-chat-box'),
      o = jQ('.es-chat-cloud'),
      e = jQ('.es-chat-iconButton'),
      s = t.classList,
      a = o.classList,
      h = e.classList
    s.contains('es-show') ? s.remove('es-show') : s.add('es-show'),
      h.contains('es-clicked') ? h.remove('es-clicked') : h.add('es-clicked'),
      setTimeout(() => {
        a.contains('es-show') ? a.remove('es-show') : a.add('es-show')
      }, 0)
  }
  formButtonVector () {
    (this.chatButtonSvgEl = cElNS(xmlns, 'svg')),
      this.chatButtonSvgEl.setAttributeNS(null, 'viewBox', '0 0 24 24'),
      this.formButtonVectorPath();
  }
  injectButtonVector () {
    this.chatButtonEl.appendChild(this.chatButtonSvgEl),
      this.injectButtonVectorPath()
  }
  formButtonVectorPath () {
    (this.chatButtonSvgPathEl = cElNS(xmlns, 'path')),
      this.chatButtonSvgPathEl.setAttributeNS(
        null,
        'd',
        'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z'
      ),
      this.chatButtonSvgPathEl.setAttributeNS(
        null,
        'fill',
        this.config.colors.secondary
      );
  }
  injectButtonVectorPath () {
    this.chatButtonSvgEl.appendChild(this.chatButtonSvgPathEl)
  }
  formChatBox () {
    (this.chatBoxEl = cEL('div')),
      this.chatBoxEl.classList.add('es-chat-box'),
      this.formChatBoxHeader(),
      this.formChatBoxBody(),
      this.formChatBoxFooter();
  }
  injectChatBox () {
    this.injectChatBoxHeader(),
      this.injectChatBoxBody(),
      this.injectChatBoxFooter(),
      this.chatContainerEl.prepend(this.chatBoxEl)
  }
  formChatBoxHeader () {
    (this.chatBoxHeaderEl = cEL('div')),
      (this.chatBoxHeaderEl.style.backgroundColor =
        this.config.colors.foreGround),
      this.chatBoxHeaderEl.classList.add('es-header'),
      this.formChatBoxHeaderDP(),
      this.formChatBoxHeaderContent(),
      this.formChatBoxHeaderDismiss();
  }
  injectChatBoxHeader () {
    this.chatBoxEl.append(this.chatBoxHeaderEl),
      this.injectChatBoxHeaderDP(),
      this.injectChatBoxHeaderContent(),
      this.injectChatBoxHeaderDismiss()
  }
  formChatBoxHeaderDP () {
    (this.chatBoxHeaderDPWrapEl = cEL('div')),
      (this.chatBoxHeaderDPEl = cEL('img')),
      (this.chatBoxHeaderDPStatusEl = cEL('span')),
      this.chatBoxHeaderDPWrapEl.classList.add('es-avatar'),
      this.chatBoxHeaderDPStatusEl.classList.add('es-status'),
      (this.chatBoxHeaderDPEl.src = this.config.businessLogo),
      (this.chatBoxHeaderDPEl.alt = 'DP'),
      (this.chatBoxHeaderDPEl.loading = 'lazy'),
      (this.chatBoxHeaderDPEl.height = 60),
      (this.chatBoxHeaderDPEl.width = 60),
      (this.chatBoxHeaderDPStatusEl.style.backgroundColor =
        this.config.colors.status);
  }
  injectChatBoxHeaderDP () {
    this.chatBoxHeaderDPWrapEl.append(this.chatBoxHeaderDPEl),
      this.chatBoxHeaderDPWrapEl.append(this.chatBoxHeaderDPStatusEl),
      this.chatBoxHeaderEl.append(this.chatBoxHeaderDPWrapEl)
  }
  formChatBoxHeaderContent () {
    (this.chatBoxHeaderContentEl = cEL('div')),
      (this.chatBoxHeaderNameEl = cEL('h5')),
      (this.chatBoxHeaderDescEl = cEL('h6')),
      this.chatBoxHeaderContentEl.classList.add('es-main'),
      this.chatBoxHeaderNameEl.classList.add('es-name'),
      this.chatBoxHeaderDescEl.classList.add('es-desc'),
      (this.chatBoxHeaderNameEl.style.color = this.config.colors.primary),
      (this.chatBoxHeaderDescEl.style.color = this.config.colors.primary),
      (this.chatBoxHeaderNameEl.innerHTML = this.config.businessName),
      (this.chatBoxHeaderDescEl.innerHTML = this.config.businessStatus);
  }
  injectChatBoxHeaderContent () {
    this.chatBoxHeaderContentEl.append(this.chatBoxHeaderNameEl),
      this.chatBoxHeaderContentEl.append(this.chatBoxHeaderDescEl),
      this.chatBoxHeaderEl.append(this.chatBoxHeaderContentEl)
  }
  formCrossVector () {
    (this.crossButtonSvgEl = cElNS(xmlns, 'svg')),
      this.crossButtonSvgEl.setAttributeNS(null, 'viewBox', '0 0 20 20'),
      this.formCrossButtonVectorPath();
  }
  formCrossButtonVectorPath () {
    (this.crossButtonSvgPathEl = cElNS(xmlns, 'path')),
      this.crossButtonSvgPathEl.setAttributeNS(
        null,
        'd',
        'M9.89944 7.77811L2.8284 0.707062C2.4379 0.316559 1.80472 0.316559 1.41422 0.707062L0.707062 1.41415C0.316559 1.80472 0.316559 2.4379 0.707062 2.8284L7.77811 9.89944L0.707062 16.9706C0.316559 17.3611 0.316559 17.9942 0.707062 18.3847L1.41422 19.0919C1.80472 19.4824 2.4379 19.4824 2.8284 19.0919L9.89944 12.0208L16.9706 19.0918C17.3611 19.4824 17.9943 19.4824 18.3848 19.0918L19.0918 18.3847C19.4825 17.9942 19.4825 17.3611 19.0918 16.9706L12.0208 9.89951L19.0918 2.8284C19.4823 2.4379 19.4823 1.80472 19.0918 1.41415L18.3848 0.707062C17.9942 0.316559 17.3611 0.316559 16.9705 0.707062L9.89944 7.77811Z'
      ),
      this.crossButtonSvgPathEl.setAttributeNS(null, 'fill-rule', 'evenodd'),
      this.crossButtonSvgPathEl.setAttributeNS(null, 'clip-rule', 'evenodd'),
      this.crossButtonSvgPathEl.setAttributeNS(
        null,
        'fill',
        this.config.colors.primary
      ),
      this.crossButtonSvgEl.append(this.crossButtonSvgPathEl);
  }
  formChatBoxHeaderDismiss () {
    this.formCrossVector(),
      (this.chatBoxDismissButtonEl = cEL('div')),
      this.chatBoxDismissButtonEl.setAttribute('aria-label', 'dismiss'),
      (this.chatBoxDismissButtonEl.className = 'es-chat-dismiss'),
      (this.chatBoxDismissButtonEl.role = 'button'),
      this.chatBoxDismissButtonEl.addEventListener(
        'click',
        this.onChatButtonClick
      )
  }
  injectChatBoxHeaderDismiss () {
    this.chatBoxDismissButtonEl.append(this.crossButtonSvgEl),
      this.chatBoxHeaderEl.append(this.chatBoxDismissButtonEl)
  }
  formChatBoxBody () {
    (this.chatBoxBodyEl = cEL('div')),
      (this.chatBoxCloudEl = cEL('div')),
      (this.chatBoxCloudContentEl = cEL('div')),
      (this.chatBoxCloudSenderEl = cEL('h5')),
      (this.chatBoxCloudMessageEl = cEL('h6')),
      (this.chatBoxCloudTimeEl = cEL('h6')),
      (this.chatBoxBodyEl.style.backgroundColor = '#E2D7CD'),
      (this.chatBoxCloudSenderEl.innerHTML = this.config.businessName),
      (this.chatBoxCloudMessageEl.innerHTML =
        this.config.welcomeMessage.replaceAll(/(?:\r\n|\r|\n)/g, '<br />')),
      this.chatBoxBodyEl.classList.add('es-body'),
      this.chatBoxCloudEl.classList.add('es-chat-cloud'),
      this.chatBoxCloudContentEl.classList.add('es-content'),
      this.chatBoxCloudSenderEl.classList.add('es-sender'),
      this.chatBoxCloudMessageEl.classList.add('es-message'),
      this.chatBoxCloudTimeEl.classList.add('es-time');
  }
  injectChatBoxBody () {
    this.chatBoxCloudContentEl.append(this.chatBoxCloudSenderEl),
      this.chatBoxCloudContentEl.append(this.chatBoxCloudMessageEl),
      this.chatBoxCloudContentEl.append(this.chatBoxCloudTimeEl),
      this.chatBoxCloudEl.append(this.chatBoxCloudContentEl),
      this.chatBoxBodyEl.append(this.chatBoxCloudEl),
      this.chatBoxEl.append(this.chatBoxBodyEl)
  }
  formChatBoxFooter () {
    (this.chatBoxFooterEl = cEL('div')),
      (this.chatBoxFooterButtonEl = cEL('a')),
      (this.chatBoxFooterButtonIconEl = cElNS(xmlns, 'svg')),
      (this.chatBoxFooterButtonIconPathEl = cElNS(xmlns, 'path')),
      (this.chatBoxFooterButtonLabelEl = cEL('span')),
      (this.chatBoxFooterPoweredEl = cEL('p')),
      this.chatBoxFooterButtonIconEl.setAttributeNS(
        null,
        'viewBox',
        '0 0 24 24'
      ),
      this.chatBoxFooterButtonIconPathEl.setAttributeNS(
        null,
        'd',
        'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z'
      ),
      this.chatBoxFooterButtonIconPathEl.setAttributeNS(
        null,
        'fill',
        this.config.colors.primary
      ),
      (this.chatBoxFooterButtonLabelEl.innerHTML = this.config.buttonLabel),
      (this.chatBoxFooterButtonEl.style.backgroundColor =
        this.config.colors.secondary),
      (this.chatBoxFooterPoweredEl.innerHTML = `POWERED BY <a href="${this.config.buttonLink}" target="_blank">${this.config.brandName}</a>`),
      this.chatBoxFooterEl.classList.add('es-footer'),
      this.chatBoxFooterButtonEl.classList.add('es-start-button'),
      this.chatBoxFooterButtonEl.setAttribute('href', this.config.buttonLink),
      this.chatBoxFooterButtonEl.setAttribute('target', '_blank'),
      this.chatBoxFooterButtonLabelEl.classList.add('label'),
      this.chatBoxFooterPoweredEl.classList.add('es-powered-by');
  }
  injectChatBoxFooter () {
    this.chatBoxFooterButtonIconEl.append(this.chatBoxFooterButtonIconPathEl),
      this.chatBoxFooterButtonEl.append(this.chatBoxFooterButtonIconEl),
      this.chatBoxFooterButtonEl.append(this.chatBoxFooterButtonLabelEl),
      this.chatBoxFooterButtonEl.addEventListener(
        'click',
        this.onChatButtonClick
      ),
      this.chatBoxFooterEl.append(this.chatBoxFooterButtonEl),
      this.chatBoxFooterEl.append(this.chatBoxFooterPoweredEl),
      this.chatBoxEl.append(this.chatBoxFooterEl)
  }
  render () {
    this.chatButtonEl.addEventListener('click', () => {
      (jQ('.es-chat-cloud .es-time').innerHTML = this.time =
        new Date().toLocaleString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: !0
        })),
        setTimeout(() => this.onChatButtonClick(), 300)
    }),
      this.injectContainer()
  }
}
token
  ? new ESChat(token)
  : (console.error('A valid token is required'),
    console.info('Provide token either in "t" or "token"'))
