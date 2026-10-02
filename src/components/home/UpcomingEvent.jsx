import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Image as ImageIcon, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const UPCOMING_EVENT = {
  date: '25–29 November 2026',
  description:
    'Join the IMTA community for shared learning, meaningful connection, and the healing power of music.',
  media: {
    video: '/events/25-29 nov 2026.mp4',
    photos: [
      {
        src: '/events/25 - 29 nov 2026.jpeg',
        alt: 'IMTA upcoming event gathering, first photo',
      },
      {
        src: '/events/25 - 29 nov 2026 (2).jpeg',
        alt: 'IMTA upcoming event gathering, second photo',
      },
    ],
  },
}

function MediaPlaceholder({ kind, label }) {
  const Icon = kind === 'video' ? Video : ImageIcon

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-highlight via-surface to-canvas px-5 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-gold/20 bg-surface text-gold shadow-surface">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="text-xs uppercase tracking-[0.2em] text-earth">Indian Music Therapy Association</span>
    </div>
  )
}

function EventPhoto({ photo, index }) {
  const [available, setAvailable] = useState(true)

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 bg-highlight shadow-surface">
      {available ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          loading="lazy"
          onError={() => setAvailable(false)}
        />
      ) : (
        <MediaPlaceholder kind="image" label={`Event photo ${index} will appear here`} />
      )}
    </div>
  )
}

function EventVideo() {
  const [available, setAvailable] = useState(true)

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-gold/15 bg-highlight shadow-surface-lg">
      {available ? (
        <video
          className="size-full bg-ink object-contain"
          controls
          playsInline
          preload="metadata"
          aria-label="Upcoming IMTA event video"
          onError={() => setAvailable(false)}
        >
          <source src={UPCOMING_EVENT.media.video} type="video/mp4" />
        </video>
      ) : (
        <MediaPlaceholder kind="video" label="Event video will appear here" />
      )}
    </div>
  )
}

export function UpcomingEvent({ detailsHref = ROUTES.events }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-canvas via-highlight/45 to-canvas py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end md:mb-10"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <CalendarDays className="size-4" aria-hidden="true" />
              {UPCOMING_EVENT.date}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-ink md:text-4xl">
              Upcoming Event
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-earth md:text-base">
              {UPCOMING_EVENT.description}
            </p>
          </div>

          <Button
            asChild
            className="shrink-0 bg-ink shadow-surface transition-transform hover:translate-y-px hover:bg-ink/90"
          >
            <Link to={detailsHref}>
              View Event Details
              <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <EventVideo />
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {UPCOMING_EVENT.media.photos.map((photo, index) => (
              <EventPhoto key={photo.src} photo={photo} index={index + 1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}