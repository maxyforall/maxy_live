
export interface FAQItem {
  q: string
  a: string
}

export interface FAQCategory {
  title: string
  faqs: FAQItem[]
}

export const faqData: Record<string, FAQCategory> = {
  maxy: {
    title: "FAQ Maxy",
    faqs: [
      {
        q: "What is Maxy?",
        a: "Maxy is a tech company providing creative solutions through applications and services, divided into Lifestyle and Productivity worlds. We also run Share Space for engaging content."
      },
      {
        q: "What worlds does Maxy have?",
        a: "Maxy is structured into two worlds: Lifestyle and Productivity. Each world includes unique apps and experiences tailored for its focus."
      },
      {
        q: "What is a Maxy ID?",
        a: "A Maxy ID is your universal account used to access any Maxy product or platform. You only need to create it once through the Maxy website."
      },
      {
        q: "What information is required to create a Maxy ID?",
        a: "To create a Maxy ID, you’ll need to enter your first name, last name, date of birth, gender, and professional email. You’ll also choose a unique Maxy ID (username) and set a secure password."
      },
      {
        q: "Can I use the same Maxy ID across different Maxy apps and platforms?",
        a: "Yes, your Maxy ID works as a single unified login for all Maxy services, whether you’re using apps or web platforms. If you create a Maxy ID while signing up for one product, your account will initially exist only in that product. Later, you can use the same Maxy ID to sign in to any other Maxy product, and a new account for that product will be created automatically, no separate sign-up needed. This system will also apply to all future Maxy products and platforms. One Maxy ID. Multiple product experiences."
      },
      {
        q: "Where do I create a Maxy ID?",
        a: "You can create a Maxy ID by visiting https://maxy.co.in."
      },
      {
        q: "I already have a Maxy ID. Do I need to create a new one for other Maxy apps or platforms?",
        a: "No. Use your existing Maxy ID to sign in to any Maxy product or platform."
      },
      {
        q: "Can I update my Maxy ID information?",
        a: "Yes. You can update certain account details via the Maxy website."
      },
      {
        q: "Can I delete my Maxy ID?",
        a: "You can request account deletion from the Maxy website. Note that this will remove access and data from all linked Maxy products."
      },
      {
        q: "Can I create a Maxy account?",
        a: "Yes. You can create a Maxy account to log in to our apps like Tackle, with a unique Maxy ID and password."
      },
      {
        q: "How do I contact Maxy or get support?",
        a: "You can reach us via our Contact page, email us at contact@maxy.com, or for technical assistance email support@maxy.co.in. You can also visit https://maxy.co.in for more help."
      },
      {
        q: "How often can I change my Maxy ID?",
        a: "You can change your Maxy ID once every 30 days from the Edit Details section of your account settings."
      },
      {
        q: "How do I change my Maxy ID?",
        a: "Go to the Account page on the Maxy website, open the Edit Details tab, and follow the on-screen prompts to update your Maxy ID."
      },
      {
        q: "Can I recover a deleted account?",
        a: "Account deletion is permanent and cannot be undone. Please contact support if you need assistance."
      }
    ],
  },
  // corex: {
  //   title: "FAQ Corex",
  //   faqs: [
  //     {
  //       q: "What is Corex?",
  //       a: "Corex is a Maxy program offering educational and entertainment experiences through two main components: Keeropedia (learning-focused) and Thrillopia (entertainment-focused)."
  //     },
  //     {
  //       q: "Do I need a Maxy ID to access Corex?",
  //       a: "Yes, a Maxy ID helps you access Corex features, track progress, and personalize your experience."
  //     },
  //     {
  //       q: "How is my personal data used?",
  //       a: "We collect non-personal analytics (like quiz attempts or voting activity) to improve features. Any personal data is handled under Maxy’s Privacy Policy."
  //     },
  //     {
  //       q: "How do coding challenges work?",
  //       a: "You can attempt challenges directly on the platform, track your progress, and view results in your dashboard."
  //     },
  //     {
  //       q: "Can I post anything on the Social Wall?",
  //       a: "Yes, but all posts must follow community guidelines. Inappropriate content can be removed."
  //     },
  //     {
  //       q: "Who owns the content I submit?",
  //       a: "You keep ownership, but by submitting, you give Maxy a license to use it within the platform."
  //     },
  //     {
  //       q: "Can my account be banned?",
  //       a: "Yes, if you break the rules, harass others, or post illegal/offensive content, your access may be suspended or terminated."
  //     },
  //     {
  //       q: "Why can’t I access a feature sometimes?",
  //       a: "We may update, suspend, or temporarily disable features for improvements or maintenance."
  //     },
  //     {
  //       q: "How is Keeropedia different from Thrillopia?",
  //       a: "Keeropedia is your go-to space for learning from curated facts to in-depth articles. Thrillopia focuses on fun and engagement with features like Fun Fact of the Day, polls, contests, and the Social Wall."
  //     },
  //     {
  //       q: "How are Keeropedia’s facts verified?",
  //       a: "All Keeropedia content is sourced from credible references, reviewed by our editorial team, and cross-checked for accuracy before publishing."
  //     },
  //     {
  //       q: "How often is Corex updated with new content?",
  //       a: "Keeropedia gets new articles and facts daily, while Thrillopia updates features like polls, fun facts, and contests daily."
  //     },
  //     {
  //       q: "Do I need to participate in every section?",
  //       a: "No. You’re free to engage with only the sections or challenges that interest you."
  //     },
  //     {
  //       q: "What happens if I win a contest in Thrillopia?",
  //       a: "Your \"win streak\" increases. This helps track your achievements within the platform."
  //     },
  //     {
  //       q: "How can I contact support?",
  //       a: "Email us at support@maxy.co.in or visit https://maxy.co.in."
  //     }
  //   ],
  // },
  // woc: {
  //   title: "FAQ WoC",
  //   faqs: [
  //     {
  //       q: "What is WoC?",
  //       a: "WoC is a platform where users can share their ideas or inventions through images and written descriptions. It’s a space to showcase creativity and connect with others."
  //     },
  //     {
  //       q: "Is a Maxy ID required to use WoC?",
  //       a: "Yes, you must have a Maxy ID to post or engage with content in WoC."
  //     },
  //     {
  //       q: "What can I post in WoC?",
  //       a: "You can post photos and brief explanations of your projects, inventions, or ideas."
  //     },
  //     {
  //       q: "Can other users interact with my posts?",
  //       a: "Yes. Users can like your submissions and view the details you've shared."
  //     },
  //     {
  //       q: "Can I connect with people who post in WoC?",
  //       a: "Yes. If the poster has made their contact or intent visible, you may reach out or connect based on the shared project."
  //     },
  //     {
  //       q: "Is there a review process for submissions?",
  //       a: "Content may be moderated to ensure it aligns with Maxy’s community guidelines."
  //     },
  //     {
  //       q: "How can I contact support?",
  //       a: "Email us at support@maxy.co.in or visit https://maxy.co.in."
  //     }
  //   ],
  // },
}

                                                    


