# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - heading "Programmatic Navigation Demo" [level=1] [ref=e4]
      - generic [ref=e5]:
        - heading "Newsletter Subscription" [level=2] [ref=e6]
        - generic [ref=e7]:
          - generic [ref=e8]:
            - generic [ref=e9]: Email address
            - textbox "Email address" [ref=e10]:
              - /placeholder: you@example.com
              - text: user@test.com
          - button "Subscribe" [active] [ref=e11]
        - paragraph [ref=e12]: Fill in your email and click Subscribe to navigate to success page
  - button "Open Next.js Dev Tools" [ref=e18] [cursor=pointer]:
    - img [ref=e19]
  - alert [ref=e22]
```