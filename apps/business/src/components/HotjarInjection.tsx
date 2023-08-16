import { Helmet } from 'react-helmet'

const HotjarInjection: React.FC = () => {
  // Hotjar code for DEV
  if (import.meta.env.VITE_PUBLIC_APP_ENVIRONMENT !== 'PROD') {
    return (
      <Helmet>
        <script id="hotjar-dev">
          {/* Hotjar Tracking Code for DEV - MoneyMoov for Business (Beta) */}
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3553091,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </script>
      </Helmet>
    )
  }

  // Hotjar code for PROD
  return (
    <Helmet>
      <script id="hotjar-prod">
        {/* Hotjar Tracking Code for MoneyMoov for Business (Beta) */}
        {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3553089,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </script>
    </Helmet>
  )
}

export default HotjarInjection
