export default function Page({ params }: { params: { slug: string } }) {
  return <div className="text-foreground">My Post {params.slug}</div>
}
