
  

# d3-simple-charts

  

Simple bar chart for Angular based on d3.js

  

##Usage & Demo

  

You can check d3-simple-charts demo [here.](https://stackblitz.com/edit/angular-simple-d3-bar?file=src/app/module/bar/bar.component.html)

  

## Installation

  

1.You can install ng2-charts using npm

  

`npm install d3-simple-charts --save`

  

## Getting Started

  

After installing `d3-simple-charts`, import it in your Angular AppModule:

```

import {SimpleBarModule} from 'd3-simple-charts';

// In your App's module:

imports: [

SimpleBarModule

]

```

  

Once the library is imported, you can use components in your Angular application:

  

## Bar Module Component

  

In your Angular `AppComponent`:

```

import { Component } from '@angular/core';

  

@Component({

selector: 'app-root',

templateUrl: './app.component.html',

styleUrls: ['./app.component.css']

})

  

export class AppComponent {

data: any;

constructor() {

this.data = [

{date: '2018-01-01', value: 270770.647, color: 'green'},

{date: '2018-02-01', value: 273220.320 },

{date: '2018-03-01', value: 253580.124},

{date: '2018-04-01', value: 254728.845},

{date: '2018-05-01', value: 244422.258},

{date: '2018-06-01', value: 244422.258},

{date: '2018-07-01', value: 244422.258},

{date: '2018-08-01', value: 244422.258, color: 'blue'},

{date: '2018-09-01', value: 244422.258},

{date: '2018-10-01', value: 244422.258},

{date: '2018-11-01', value: 244422.258},

{date: '2018-12-01', value: 244422.258, color: 'yellow' }

];

}

}

```

Now, You can use `<d3-bar-component>` component in your app.component.html template:

  

```

<h1>{{title}}</h1>

<d3-bar-component [data]='data'></d3-bar-component>

```

## Progress Module Component

import `SimpleProgressModule` in your Angular AppModule:

    ```

    import {SimpleProgressModule} from 'd3-simple-charts';

    // In your App's module:

    imports: [

    SimpleProgressModule

    ]

    ```

In your Angular `AppComponent`:

    ```

    import { Component } from '@angular/core';

    @Component({

    selector: 'app-root',

    templateUrl: './app.component.html',

    styleUrls: ['./app.component.css']

    })

    export class AppComponent {

    data: {
        data: number,
        color?: string
    };

    constructor() {
        this.data = {
        data: 60
    }
    }
    }

    ```

Now, You can use `<d3-progress-component>` component in your app.component.html template:

  

    ```

    <d3-progress-component [progressModel] = "data">

    </d3-progress-component>

    ```

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

  

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).