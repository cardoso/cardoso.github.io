---
layout: post
title:  "Spread operator in Swift? Sourcery!"
date:   2018-02-17 10:28:25 -0300
categories: swift sourcery
---

```swift
enum Sex {
    case male, female
}

struct Person {
    let name: String
    let age: Int
    let sex: Sex
}

let john = Person(
    name: "John", 
    age: 24, 
    sex: .male
)
```
*Code like this is beautiful, but, in Swift, some operations may be convoluted*

What if John decides to clone himself?

```swift
let james = Person(
    name: "James", 
    age: john.age, 
    sex: john.sex
)
```

See the problem? It's kind of verbose, and what if we had a dozen properties in `struct Person`?

In Javascript we have the "spread" operator:

```javascript
const Sex = {
    MALE: 0,
    FEMALE: 1
}

const john = {
    name: "John", 
    age: 24, 
    sex: Sex.MALE
}

const james = {
    ...john, // ...spread!
    name: "James"
}
```

We are spreading John's properties into a new object and only adjusting the "name" property.

We can achieve something similar in Swift by declaring an initializer with default parameters:

```swift
// Inside an extension so we don't lose the compiler-generated initializer
extension Person {
    init(_ person: Person, name: String? = nil, age: Int? = nil, sex: Sex? = nil) {
        self = Person(
            name: name ?? person.name,
            age: age ?? person.age,
            sex: sex ?? person.sex
        )
    }
}

let james = Person(john, name: "James") // 🎉!!!
```

But what if we have dozens of these types?
And some of these types have dozens of properties?


That's what [Sourcery](https://github.com/krzysztofzablocki/Sourcery) is for!

>
Sourcery is a code generator for Swift language, built on top of Apple's own SourceKit. It extends the language abstractions to allow you to generate boilerplate code automatically.

For this case, we make a "marker" protocol and a [Stencil](https://github.com/kylef/Stencil) template.

```swift
// Spreadable.swift

protocol Spreadable { }

// Spreadable.stencil
{% raw %}
{% for type in types.implementing.Spreadable %}
extension {{type.name}} {
    init(
        _ object: {{type.name}},
        {% for variable in type.storedVariables %}
        {{variable.name}}: {{variable.typeName}}? = nil{% if not forloop.last %},{% endif %}
        {% endfor %}
    ) {
        self = {{type.name}}(
            {% for variable in type.storedVariables %}
            {{variable.name}}: {{variable.name}} ?? object.{{variable.name}}{% if not forloop.last %},{% endif %}
            {% endfor %}
        )
    }
}
{% endfor %}
{% endraw %}
```

This should be enough to generate the "spread-like" initializer we need for any of our structs and classes!

Now, I'd like to leave it at that, but the name of the post is "Spread operator in Swift" and there will be no false advertisements here! 
So, let's make the actual spread operator, for science!

```swift
// Spreadable.swift

struct Spread<T: Spreadable> {
    let object: T
}

protocol Spreadable { }

extension Spreadable {
    static prefix func ... (_ object: Self) -> Spread<Self> {
        return Spread<Self>(object: object)
    }
}

// Spreadable.stencil
{% raw %}
{% for type in types.implementing.Spreadable %}
extension {{type.name}} {
    init(
        _ spread: Spread<{{type.name}}>,
        {% for variable in type.storedVariables %}
        {{variable.name}}: {{variable.typeName}}? = nil{% if not forloop.last %},{% endif %}
        {% endfor %}
    ) {
        self = {{type.name}}(
            {% for variable in type.storedVariables %}
            {{variable.name}}: {{variable.name}} ?? spread.object.{{variable.name}}{% if not forloop.last %},{% endif %}
            {% endfor %}
        )
    }
}
{% endfor %}
{% endraw %}
```

This lets us do this with any struct or class that conforms to `Spreadable`:

```swift
let john = Person(
    name: "John", 
    age: 24, 
    sex: .male
)

let james = Person(
    ...john, 
    name: "James"
)
```

Of course, this doesn't encompass all of the spread operator's functionality in JavaScript, but it's a very useful part of it and we get to keep Swift's type-safety features :)

I think the spread operator - or something similar - would be a very welcome addition to Swift!