# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - heading "Создание инвойса" [level=1] [ref=e3]
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]: Клиент
        - combobox "Клиент" [ref=e7]:
          - option "Выберите клиента" [selected]
          - option "Alice Johnson"
          - option "Bob Smith"
          - option "Carol White"
      - generic [ref=e8]:
        - generic [ref=e9]: Сумма ($)
        - spinbutton "Сумма ($)" [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e12]: Статус
        - combobox "Статус" [ref=e13]:
          - option "Выберите статус" [selected]
          - option "pending"
          - option "paid"
          - option "void"
      - button "Создать" [active] [ref=e14]
  - generic [ref=e19] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e20]:
      - img [ref=e21]
    - generic [ref=e24]:
      - button "Open issues overlay" [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]: "0"
          - generic [ref=e28]: "1"
        - generic [ref=e29]: Issue
      - button "Collapse issues badge" [ref=e30]:
        - img [ref=e31]
  - alert [ref=e33]
```