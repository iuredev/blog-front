import { useParams } from "react-router";
import "tailwindcss/tailwind.css";
import { Markdown } from "../../components";
import { getMinutesToRead } from "../../utils";


export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  

  // const helmet = useHelmet("Post", "This is a post");
    
  const markdownContent = `
# My Quantified Self Set-up
When I published my inaugural  a week ago, I ended up getting a few questions about how I track various metrics. While I suspect this system will evolve over time, I can share what it looks like at the moment.

## 📱 MOBILE

// BLOCKQUOTE EXAMPLE
> I use an app called [Exist](https://exist.io) to track a variety of data points. Exist has a number of integrations, but I only use a few of them. Here's what I'm tracking:


I use an app called [Exist](https://exist.io) to track a variety of data points. Exist has a number of integrations, but I only use a few of them. Here's what I'm tracking:

link to airtable

## 😉 WELLNESS


I'm planning on revising this spreadsheet annually, but right now the data spans 8 categories: Sleep, Wellness, Audience, Phone, Desktop, Fitness, Reading, and Location.

> Side note: I enjoy spreadsheet apps more in dark mode and since that functionality isn't available in Airtable yet, I've been using [Dark Reader](https://darkreader.org) as a solution. I like it a lot so far.

## 💤 SLEEP

\`\`\`java 
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

\`\`\`typescript
function greet(name: string): string {
    return "Hello!" + "name";
}

console.log(greet('TypeScript'));
\`\`\`
`;

  return (
    <div className="container mx-auto">
      {/* {helmet} */}
      <div className="mt-12 mb-4">
        <h1 className="text-4xl font-bold">Name Post {slug}</h1>
        <p className="mb-4 text-gray-400">date • category • {getMinutesToRead(markdownContent)}</p>
      </div>
      <div className="content">
        <Markdown content={markdownContent} />
      </div>
    </div>
  );
}
