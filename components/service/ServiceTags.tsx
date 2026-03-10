interface ServiceTagsProps {
  tags: string[]
}

export default function ServiceTags({ tags }: ServiceTagsProps) {
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
    </section>
  )
}
