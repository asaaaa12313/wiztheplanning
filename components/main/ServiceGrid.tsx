import { services } from '@/data/services'
import GridCell from './GridCell'

export default function ServiceGrid() {
  return (
    <div
      id="services"
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1.2fr 1fr 1fr 1fr',
        gap: 2,
        background: '#e5e5e5',
      }}
    >
      {services.map((service, i) => (
        <GridCell
          key={service.id}
          service={service}
          style={i === 0 ? { gridColumn: '1 / -1' } : undefined}
        />
      ))}
    </div>
  )
}
