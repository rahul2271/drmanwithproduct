# Blog System Features & Usage Guide

## Admin Panel Features

### Create Blog Post (`/admin/create`)

**Content Tab:**
- Full markdown editor with H1-H4 headings
- Bold, italic, underline formatting
- Bullet and numbered lists
- Code blocks and inline code
- Quote formatting
- Auto-slug generation from title
- Character counters for SEO optimization

**Media Tab:**
- Upload featured image from computer (drag & drop support)
- Insert images by URL
- Add videos (MP4, WebM, Ogg)
- Upload images directly inside blog content from file explorer
- Image alt text for SEO
- Preview of all media

**SEO Tab:**
- Focus keyword field
- Meta description (150-160 chars)
- Keywords and meta tags
- Canonical URL
- Open Graph image for social sharing
- SEO checklist with guidelines

**Preview Tab:**
- Google search result preview
- Social media sharing preview
- Real-time markdown rendering

### Dashboard (`/admin/dashboard`)
- View all blog posts (published and drafts)
- Search by title or excerpt
- Filter by category
- Toggle publish/unpublish status
- Edit existing blogs
- Delete blogs
- Quick stats (total blogs, published count)

### Edit Blog (`/admin/edit/[id]`)
- Same features as create
- Pre-filled with existing content
- Update any field
- Change publish status
- Delete blog with confirmation

## Frontend Features

### Blog Page (`/blog`)
- Display all published blogs
- Responsive grid layout
- Blog cards with:
  - Featured image
  - Title
  - Excerpt
  - Category badge
  - Author name
  - Read time estimate
  - Publication date
- Click to read full blog post

### Blog Detail Page
- Full blog content with formatting
- Related blogs sidebar
- Share buttons
- Author information
- Category tags
- Table of contents (if H2/H3 headings exist)

## Text Editor Toolbar

| Button | Function | Shortcut |
|--------|----------|----------|
| H1-H4 | Heading levels | Click to add |
| Bold | **Bold text** | Click to wrap selection |
| Italic | *Italic text* | Click to wrap selection |
| Underline | <u>Underline</u> | Click to wrap selection |
| Bullet | - Bullet point | Click to add |
| Numbered | 1. List item | Click to add |
| Quote | > Blockquote | Click to add |
| Code | \`code\` | Click to wrap inline |
| Upload | Upload from computer | Click to browse files |
| Image | Insert by URL | Paste image link |
| Video | Embed video | Paste video URL |

## Markdown Syntax Reference

\`\`\`
# Heading 1 (H1)
## Heading 2 (H2)
### Heading 3 (H3)
#### Heading 4 (H4)

**Bold text**
*Italic text*
<u>Underline text</u>

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> This is a quote
> Multiple lines supported

\`inline code\`

\`\`\`
code block
multiple lines
\`\`\`

![Alt text](https://image-url.com/image.jpg)

[Link text](https://example.com)
\`\`\`

## Best Practices

### SEO Optimization
- Focus keyword in title and first paragraph
- Meta description 150-160 characters
- Use H2/H3 for section headers (includes in table of contents)
- Add descriptive alt text to all images
- Use keywords naturally in content
- Keep slug simple and descriptive

### Image Guidelines
- Featured image: 1200x800px minimum
- Compress images before uploading
- Use descriptive filenames (ayurveda-psoriasis-treatment.jpg)
- Include alt text for accessibility

### Content Guidelines
- Minimum 500 words for good SEO
- Use short paragraphs (2-3 sentences)
- Include images every 300-400 words
- Use headings to structure content
- Keep focus keyword density 1-2%

### Video Guidelines
- Host videos on reliable CDN (YouTube, Vimeo, AWS S3)
- Use HTTPS URLs only
- Keep video player responsive (100% width)
- Add transcript for accessibility

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Image upload takes too long | Check file size (< 5MB recommended) |
| Blog doesn't appear after publishing | Check if marked as "Published" in form |
| Preview looks different from published | Clear browser cache (Ctrl+Shift+Delete) |
| Can't upload images to content | Verify Storage rules are published in Firebase |
| Slug conflicts with existing post | Edit slug to make it unique |
