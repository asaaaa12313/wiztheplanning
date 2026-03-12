interface ServiceTagsProps {
  tags: string[]
  title?: string
}

export default function ServiceTags({ tags, title }: ServiceTagsProps) {
  return (
    <section
      style={{
        padding: 24,
        background: '#fff',
        borderBottom: '1px solid #eee',
      }}
    >
      <div
        style={{
          maxWidth: 700,
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 900,
              color: '#111',
              letterSpacing: '0.05em',
              marginBottom: 16,
            }}
          >
            {title}
          </h2>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '8px 16px',
                fontSize: 12,
                background: '#f5f5f5',
                color: '#555',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
