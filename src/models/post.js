export default class Post {
  constructor(node) {
    const { id, html, excerpt, frontmatter, fields } = node;
    const { slug } = fields;
    const { categories, title, author, date } = frontmatter;

    this.id = id;
    this.excerpt = excerpt;
    this.html = html;
    this.slug = slug;
    this.title = title;
    this.author = author;
    this.date = date;
    this.categories = categories.split(' ');
  }
}
