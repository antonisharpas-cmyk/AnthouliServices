import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

// Short About block for the home page. Full story, values and team live on /about.
export default function AboutIntro() {
  const { t } = useTranslation()
  return (
    <section className="section bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} align="left" />
        </div>
        <div className="reveal-right lg:col-span-7">
          <p className="lead">{t('about.p1')}</p>
          <p className="lead mt-5">{t('about.p2')}</p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
            {t('home.aboutButton')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
