import WelcomeBanner from '../src/components/home/WelcomeBanner'
import PilihMatkul from '../src/components/home/PilihMatkul'
import Layout from '../src/layout/layout'

export default function App () {
  return (
    <Layout>
      <WelcomeBanner />
      <PilihMatkul />
    </Layout>
  )
}
