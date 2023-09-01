
## 生命周期

指的是引用的生命周期，避免悬垂指针和使用已经释放的内容，通常在函数参数和返回值中应用。

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // 错误！

    println!("the first word is: {}", word);
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

以上的例子中，`&s[0..i]` 建立了 `s` 的联系，且是不可变引用。当调用 `clear` 时，它需要一个可变引用，而此时已经有了不可变引用： `word`，同时有用不可变引用和可变引用是不可能。