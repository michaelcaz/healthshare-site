# Font Files Required

For proper production deployment, the following font files need to be placed in this directory:

- Satoshi-Regular.woff2
- Satoshi-Regular.woff
- Satoshi-Medium.woff2
- Satoshi-Medium.woff
- Satoshi-Bold.woff2
- Satoshi-Bold.woff

## How to obtain these files:

1. Visit https://www.fontshare.com/fonts/satoshi
2. Download the font files
3. Extract the woff and woff2 files 
4. Place them in this `/public/fonts/` directory

## Alternatives:

If you prefer to use a CDN, you can edit the globals.css file to use:

```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
```

However, for better performance and reliability, it's recommended to host the font files locally. 