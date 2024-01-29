# Engineering Guidelines

## Testing

Code must be thoroughly tested with quality unit tests.

We defer to the [Moloch Testing Guide](https://github.com/MolochVentures/moloch/tree/master/test#readme) for specific recommendations, though not all of it is relevant here. Note the introduction:

> Tests should be written, not only to verify correctness of the target code, but to be comprehensively reviewed by other programmers. Therefore, for mission critical Solidity code, the quality of the tests are just as important (if not more so) than the code itself, and should be written with the highest standards of clarity and elegance.

Every addition or change to the code must come with relevant and comprehensive tests.

Refactors should avoid simultaneous changes to tests.

Flaky tests are not acceptable.

The test suite should run automatically for every change in the repository, and in pull requests tests must pass before merging.

The test suite coverage must be kept as close to 100% as possible, enforced in pull requests.

In some cases unit tests may be insufficient and complementary techniques should be used:

1. Property-based tests (aka. fuzzing) for math-heavy code.
2. Formal verification for state machines.

## Code style

Typescript code should be written in a consistent format enforced by a linter, following the official [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). See below for further [Typescript Conventions](#typescript-conventions).

The code should be simple and straightforward, prioritizing readability. Consistency and predictability should be maintained across the codebase. In particular, this applies to naming, which should be systematic, clear, and concise.

Sometimes these guidelines may be broken if doing so brings significant efficiency gains, but explanatory comments should be added.

Modularity should be pursued, but not at the cost of the above priorities.

## Documentation

For contributors, project guidelines and processes must be documented publicly.

For users, features must be abundantly documented. Documentation should include answers to common questions, solutions to common problems, and recommendations for critical decisions that the user may face.

All changes to the core codebase (excluding tests, auxiliary scripts, etc.) must be documented in a changelog, except for purely cosmetic or documentation changes.

## Peer review

All changes must be submitted through pull requests and go through peer code review.

The review must be approached by the reviewer in a similar way as if it was an audit of the code in question (but importantly it is not a substitute for and should not be considered an audit).

Reviewers should enforce code and project guidelines.

External contributions must be reviewed separately by multiple maintainers.

## Automation

Automation should be used as much as possible to reduce the possibility of human error and forgetfulness.

Automations that make use of sensitive credentials must use secure secret management, and must be strengthened against attacks such as [those on GitHub Actions worklows](https://github.com/nikitastupin/pwnhub).

Some other examples of automation are:

- Looking for common security vulnerabilities or errors in our code.
- Keeping dependencies up to date and monitoring for vulnerable dependencies.

## Pull requests

Pull requests are squash-merged to keep the `main` branch history clean. The title of the pull request becomes the commit message, so it should be written in a consistent format:

1) Begin with a capital letter.
2) Do not end with a period.
3) Write in the imperative: "Add feature X" and not "Adds feature X" or "Added feature X".

This repository does not follow conventional commits, so do not prefix the title with "fix:" or "feat:".

Work in progress pull requests should be submitted as Drafts and should not be prefixed with "WIP:".

Branch names don't matter, and commit messages within a pull request mostly don't matter either, although they can help the review process.

# Typescript Conventions

In addition to the official Google TypeScript Style Guide we have a number of other conventions that must be followed.
### Naming

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

**Use meaningful variable names.**

Distinguish names in such a way that the reader knows what the differences offer.

Bad:

 ``` typescript
 function isBetween(a1: number, a2: number, a3: number): boolean {
   return a2 <= a1 && a1 <= a3;
 }
```

Good: 

``` typescript
 function isBetween(value: number, left: number, right: number): boolean {
   return left <= value && value <= right;
 }
```

**Use pronounceable variable names**

If you can't pronounce it, you can't discuss it without sounding weird.

Bad:

``` typescript
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
```

Good:

``` typescript
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}
```

**Avoid mental mapping**

Explicit is better than implicit.<br />
*Clarity is king.*

Bad:

``` typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

Good:

``` typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**Don't add unneeded context**

If your class/type/object name tells you something, don't repeat that in your variable name.

Bad:

``` typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

Good:

``` typescript
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

### Naming Conventions

* Use camelCase for variable and function names

Bad:

``` typescript
var FooVar;
function BarFunc() { }
```

Good:

``` typescript
var fooVar;
function barFunc() { }
```

* Use camelCase of class members, interface members, methods and methods parameters

Bad:

``` typescript
class Foo {
  Bar: number;
  Baz() { }
}
```

Good:

``` typescript
class Foo {
  bar: number;
  baz() { }
}
```

* Use PascalCase for class names and interface names.

Bad:

``` typescript
class foo { }
```

Good:

``` typescript
class Foo { }
```

* Use PascalCase for enums and camelCase for enum members

Bad:

``` typescript
enum notificationTypes {
  Default = 0,
  Info = 1,
  Success = 2,
  Error = 3,
  Warning = 4
}
```

Good:

``` typescript
enum NotificationTypes {
  default = 0,
  info = 1,
  success = 2,
  error = 3,
  warning = 4
}
```

### Naming Booleans

* Don't use negative names for boolean variables.

Bad:

``` typescript
const isNotEnabled = true;
```

Good:

``` typescript
const isEnabled = false;
```

* A prefix like is, are, or has helps every developer to distinguish a boolean from another variable by just looking at it

Bad:

``` typescript
const enabled = false;
```

Good:

``` typescript
const isEnabled = false;
```

### Brackets

* **OTBS** (one true brace style). [Wikipedia](https://en.wikipedia.org/wiki/Indentation_style#Variant:_1TBS_(OTBS))

The one true brace style is one of the most common brace styles in TypeScript, in which the opening brace of a block is placed on the same line as its corresponding statement or declaration.

``` typescript
if (foo) {
  bar();
}
else {
  baz();
}
```

* Do not omit curly brackets
  
* **Always** wrap the body of the statement in curly brackets.

### Spaces

Use 2 spaces. Not tabs.

### Semicolons

Use semicolons.

### Code Comments

> So when you find yourself in a position where you need to write a comment, think it through  and  see  whether  there  isn't  some  way  to  turn  the  tables  and  express  yourself  in code. Every time you express yourself in code, you should pat yourself on the back. Everytime you  write  a  comment,  you  should  grimace  and  feel  the  failure  of  your  ability of expression.

**Bad Comments**

Most comments fall into this category. Usually they are crutches or excuses for poor code or justifications for insufficient  decisions, amounting to little more than the programmer talking to himself.

**Mumbling**

Plopping in a comment just because you feel you should or because the process requires it, is a hack. If you decide to write a comment, then spend the time necessary to make sure it is the best comment you can write.

**Noise Comments**

Sometimes you see comments that are nothing but noise. They restate the obvious and provide no new information.

``` typescript
// redirect to the Contact Details screen
this.router.navigateByUrl(`/${ROOT}/contact`);
```

``` typescript
// self explanatory, parse ...
this.parseProducts(products);
```

**Scary noise**

``` typescript
/** The name. */
private name;

/** The version. */
private version;

/** The licenceName. */
private licenceName;

/** The version. */
private info;
```

Read these comments again more carefully. Do you see the cut-paste error? If authors aren't  paying attention when comments are  written (or pasted), why should  readers be expected to profit from them?

**TODO Comments**

In general, TODO comments are a big risk. We may see something that we want to do later so we drop a quick **// TODO: Replace this method** thinking we'll come back to it but never do.

If you're going to write a TODO comment, you should link to your external issue tracker.

There are valid use cases for a TODO comment. Perhaps you're working on a big feature and you want to make a pull request that only fixes part of it. You also want to call out some refactoring that still needs to be done, but that you'll fix in another PR.

``` typescript
// TODO: Consolidate both of these classes. PURCHASE-123
```

This is actionable because it forces us to go to our issue tracker and create a ticket. That is less likely to get lost than a code comment that will potentially never be seen again. 

**Comments can sometimes be useful**

* When explaining why something is being implemented in a particular way.
* When explaining complex algorithms (when all other methods for simplifying the algorithm have been tried and come up short).

**Comment conventions**

* Write comments in *English*.
  
* Do not add empty comments
  
* Begin single-line comments with a single space
  
Good:

``` typescript
// Single-line comment
```

Bad:

``` typescript
//Single-line comment
//  Single-line comment
```

* Write single-line comments properly
  
  * Single-line comments should always be preceded by a single blank line.
  * Single-line comments should never be followed by blank line(s).

Good:

``` typescript
const x;

// This comment is valid
const y;
```

Bad:

``` typescript
const x;

// This comment is not valid

const y;
```
``` typescript
const x;
// This comment is not valid

const y;
```

* Do not write embedded comments

  * Do not write comments between declaration of statement and opening curly brackets.
  * Place comments above statements, or within statement body.

Good:

``` typescript
// This method does something..
public method() {
}
```

Bad: 

``` typescript
public method() { // This method does something..
}
```

``` typescript
public method() {
// This method does something..
}
```

### Barrels

> A barrel is a way to rollup exports from several modules into a single convenience module. The barrel itself is a module file that re-exports selected exports of other modules.

> **import noise** - this is an issue seen in languages where there are dependencies that need to be "imported", "required", or "included" and the first (1 - n) lines are non functional code.

Example of a barrel file:

``` typescript
export * from './product-added-dialog.component';
export * from './website-selector.component';
export * from './product-family-selector.component';
export * from './individual-product-selector.component';
export * from './license-type-selector.component';
export * from './period-and-quantity-selector.component';
```

How to use it inside components:

Good:

``` typescript
import { CartsService, PaidSupportService, SettingsService } from '@modules/services';
```

Bad:

``` typescript
import { SettingsService } from './settings/settings.service';
import { CartsService } from './carts/carts.service';
import { PaidSupportService } from './paid-support/paid-support.service';
```

* Barrel files are named index.ts by convention
* Do not import a barrel in the files that are already used in that barrel because this leads to circular dependency


## Angular coding style guide

### Organize imports

With clean and easy to read import statements you can quickly see the dependencies of current code. Make sure you apply following good practices for import statements:

* Unused imports should be removed.
* Groups of imports are delineated by one blank line before and after.
* Groups must respect following order:
  * Angular imports (i.e. import { HttpClient } from '@angular/common/http')
  * Angular material imports (i.e. import { MatSelectChange } from '@angular/material/select')
  * 3rd party imports except rxjs (i.e. import { SessionStorageService } from 'ngx-webstorage')
  * rxjs imports (i.e import { skipWhile } from 'rxjs/operators')
  * application imports sorted by type (services, classes, interfaces, enums)

Bad:

``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { SessionStorageService } from 'ngx-webstorage';

import { merge, Observable, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { INumberToTypeDictionary, Utils } from '@shared/classes';

import { ProductUtils } from '@modules/services/products/classes';

import { AdditionalServicesApi } from './additional-services-api';
```

Good:

``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { SessionStorageService } from 'ngx-webstorage';

import { merge, Observable, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { INumberToTypeDictionary, Utils } from '@shared/classes';
import { ProductUtils } from '@modules/services/products/classes';
import { AdditionalServicesApi } from './additional-services-api';
```
### Use typescript aliases

This will avoid long relative paths when doing imports.

Bad:

``` typescript
import { UserService } from '../../../services/UserService';
```

Good:

``` typescript
import { UserService } from '@services/UserService';
```

### Specify component member accessor explicitly

TypeScript supports public (*default*), protected and private accessors on class members.

Bad:

``` typescript
export class ConsultingEntryComponent {
  quantities: number[] = [];
  isBeingRemoved = false;

  destroyed$ = new Subject<void>();

  constructor(private productsService: ProductsService) { }

  get isBeingProcessed(): boolean {
    return this.disabled || this.isBeingRemoved;
  }

  get isDiscountedPriceAvailable(): boolean {
    return !(Utils.isNullOrUndefined(this.fullPrice) || Utils.isNullOrUndefined(this.discounts));
  }

  onPeriodSelectionChanged(event: MatSelectChange): void {
    this.changeMade.next();
  }
}
```

Good:

``` typescript
export class ConsultingEntryComponent {
  public quantities: number[] = [];
  public isBeingRemoved = false;

  private destroyed$ = new Subject<void>();

  constructor(private productsService: ProductsService) { }

  public get isBeingProcessed(): boolean {
    return this.disabled || this.isBeingRemoved;
  }

  private get isDiscountedPriceAvailable(): boolean {
    return !(Utils.isNullOrUndefined(this.fullPrice) || Utils.isNullOrUndefined(this.discounts));
  }

  public onPeriodSelectionChanged(event: MatSelectChange): void {
    this.changeMade.next();
  }
}
```

Use the private or protected accessor as much as you can because it provides a better encapsulation.

### Component structure

Use the following component structure:

1. Input properties (i.e. @Input() product: OrderItemModel)
2. Output properties (i.e. @Output() changeMade = new EventEmitter<void>(true))
3. ViewChild / ViewChildren (i.e. @ViewChild(ChildDirective) child!: ChildDirective)
4. HostBinding properties (i.e. @HostBinding('class.valid') get valid() { return this.control.valid; })
5. data members (i.e. public isBeingRemoved = false)
7. constructor
8. lifecycle hooks (following their execution order)
9. getters/setters
10. event handlers
11. other methods

Use the following component accessors order:

1. private
2. protected
3. public

* Separate each group with a whitespace before and after


### Barrels

Barrels can cause circular dependencies when they are used to import stuff from the same module.
Given the structure:
```
module/
|- a.component.ts
|- b.component.ts
|- b.model.ts
|- index.ts
```

index.ts
```
export * from 'b.component.ts';
export * from 'a.component.ts';
export * from 'b.model.ts';
```
Trying to import b.component.ts inside a.component.ts through index.ts will cause a circular dependency. 
To solve this issue we have to import b.component.ts directly.

### private Subject, public Observable pattern

Utilizing a private Subject and a public Observable allows us to lock down access to our Subject and prevent its modification.

The goal is to emit changes only from the service that the Subject belongs to and make the value emitted available through an observable. This allows us to have a SSOT (single source of truth).

Bad:

``` typescript
export class AdditionalServicesService extends AdditionalServicesApi {
  public escrowCartEntries$ = new BehaviorSubject<OrderItemModel[]>([]);
}
```

* The Subject is made public so it can be changed outside the service.

Good:

``` typescript
export class AdditionalServicesService extends AdditionalServicesApi {
  public escrowCartEntries$: Observable<OrderItemModel[]>;

  private escrowCartEntriesSubject$ = new BehaviorSubject<OrderItemModel[]>([]);
  
  constructor() {
    this.escrowCartEntries$ = this.escrowCartEntriesSubject$.asObservable();
  }
}
```

*  Here we utilize a Subject and an Observable derived from the Subject. We emit changes to the Subject from the service, and expose it to the outside world through the Observable


### Services inside HTML templates

Avoid referencing services in HTML templates.

Bad:

``` HTML
<div class="price">pricingService.articlePrice</div>
```

Good:

``` HTML
<div class="price">articlePrice</div>
```

Why to avoid it?

* It couples the service implementation with the HTML template
* It breaks the LoD (Law of Demeter)
* VS Code does not support it (cannot find service reference inside template) so it makes refactoring not that fun anymore

### Manage Subscriptions Declaratively

It can become a little bit tedious to make sure everything gets unsubscribed when the component is destroyed.

So the solution is to compose our subscriptions with the **takeUntil** operator and use a subject that emits a truthy value in the ngOnDestroy lifecycle hook.

Bad:

``` typescript
import { Component, OnDestroy } from '@angular/core';

@Component({ ... })
export class AppComponent implements OnDestroy {
  subject$ = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.subject$.unsubscribe();
  }
}
```

Good:

``` typescript
import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({ ... })
export class AppComponent implements OnDestroy {
  rxSubscriptionCancellationSubject$ = new Subject<void>();

  constructor(private downloadsService: DownloadsService) {
    this.downloadsService.getRenewalQuotationAsFile$
      .pipe(
        takeUntil(this.rxSubscriptionCancellationSubject$)
      )
      .subscribe(
        result => {
          console.log(`${ID}: getRenewalQuotationAsFile$ emitted`, result);
        }
      );
  }

  ngOnDestroy(): void {
    this.rxSubscriptionCancellationSubject$.next();
    this.rxSubscriptionCancellationSubject$.complete();
  }
}
```