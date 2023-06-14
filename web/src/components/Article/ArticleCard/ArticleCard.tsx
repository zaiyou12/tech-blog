import { FindArticleListQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card'
import { cleanHtmlTag, intlDateTimeFormat } from 'src/lib/formatters'

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

interface Props {
  article: FindArticleListQuery['articles'][0]
}

const ArticleCard = ({ article }: Props) => {
  const formattedDateTime = intlDateTimeFormat(article.createdAt)
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={routes.article({ id: article.id })}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.createdAt}
          className="md:hidden"
          decorate
        >
          {formattedDateTime}
        </Card.Eyebrow>
        <Card.Description>
          {truncate(cleanHtmlTag(article.body), 110)}
        </Card.Description>
        <Card.Cta>자세히 보기</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.createdAt}
        className="mt-1 hidden md:block"
      >
        {formattedDateTime}
      </Card.Eyebrow>
    </article>
  )
}

export default ArticleCard
