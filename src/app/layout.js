import './globals.css';
import { ReduxProvider } from '../components/Providers';

export const metadata = {
  title: 'JEE Chapter Dashboard',
  description: 'Track your JEE preparation progress',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}




