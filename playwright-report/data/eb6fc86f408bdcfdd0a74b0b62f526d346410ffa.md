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
  - button "Open Next.js Dev Tools" [ref=e20] [cursor=pointer]:
    - img [ref=e21]
  - alert [ref=e24]
```