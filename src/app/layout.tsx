export default function RootLayout({ children }) {
  return (
      <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>CyberTicket</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}