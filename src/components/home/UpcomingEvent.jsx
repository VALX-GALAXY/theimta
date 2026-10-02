import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Image as ImageIcon,
  Video,
} from 'lucide-react'
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

function EventMediaCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [unavailablePhotos, setUnavailablePhotos] = useState([])
  const [videoAvailable, setVideoAvailable] = useState(true)
  const photoCount = UPCOMING_EVENT.media.photos.length
  const isVideo = activeIndex === photoCount

  useEffect(() => {
    if (isVideo && videoAvailable) return undefined

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % (photoCount + 1))
    }, 10_000)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, isVideo, photoCount, videoAvailable])

  function goToMedia(index) {
    setActiveIndex((index + photoCount + 1) % (photoCount + 1))
  }

  const currentPhoto = UPCOMING_EVENT.media.photos[activeIndex]

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-gold/15 bg-highlight shadow-surface-lg">
        {isVideo ? (
          videoAvailable ? (
            <video
              key="upcoming-event-video"
              className="size-full bg-ink object-contain"
              autoPlay
              controls
              muted
              playsInline
              preload="metadata"
              aria-label="Upcoming IMTA event video"
              onEnded={() => setActiveIndex(0)}
              onError={() => setVideoAvailable(false)}
            >
              <source src={UPCOMING_EVENT.media.video} type="video/mp4" />
            </video>
          ) : (
            <MediaPlaceholder kind="video" label="Event video is not available yet" />
          )
        ) : unavailablePhotos.includes(activeIndex) ? (
          <MediaPlaceholder kind="image" label={`Event photo ${activeIndex + 1} is not available yet`} />
        ) : (
          <img
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="size-full object-cover transition-transform duration-500 hover:scale-[1.015]"
            loading="lazy"
            onError={() =>
              setUnavailablePhotos((photos) => [...new Set([...photos, activeIndex])])
            }
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-earth" aria-live="polite">
          {isVideo ? 'Event video' : `Event photo ${activeIndex + 1}`} of {photoCount + 1}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToMedia(activeIndex - 1)}
            aria-label="Previous event media"
            className="flex size-10 items-center justify-center rounded-full border border-gold/20 bg-surface text-ink transition-colors hover:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goToMedia(activeIndex + 1)}
            aria-label="Next event media"
            className="flex size-10 items-center justify-center rounded-full border border-gold/20 bg-surface text-ink transition-colors hover:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
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
          <EventMediaCarousel />
        </motion.div>
      </div>
    </section>
  )
}