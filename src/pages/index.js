import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"
import ConfettiGenerator from "confetti-js"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import { relative } from "path"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  //var isBirthday = new Date().getMonth() == 9 && new Date().getDate() == 15

  React.useEffect(() => {
    const confettiSettings = {
      target: "my-canvas",
      size: 2,
      max: 1600,
      height: 3840,
      clock:50
    }

    const confetti = new ConfettiGenerator(confettiSettings)
    // if (isBirthday) {
    confetti.render()
    //}

    return () => {
      confetti.clear()
    }
  }, [])

  return (
    <Layout title={siteTitle}>
      <div
        style={{
          position: "relative",
          zIndex: 300,
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
        textColor="black"
      >
        {
          //isBirthday &&
          <div
            style={{
              margin: "20px",
              fontSize: "22px",
            }}
          >
            Doğum günün kutlu olsun. Nice mutlu yıllara...
          </div>
        }
        <canvas
          id="my-canvas"
          style={{
            position: "absolute",
            pointerEvents: "none",
          }}
        ></canvas>
      </div>

      <SEO title="home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      {/* <Bio /> */}
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
