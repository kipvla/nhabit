import { keyframes, animate, animateChild, group, query, style, transition, trigger, animation } from "@angular/animations";

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave ', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0.9) translateY(10%)',
      })
    ]),
    query(':enter', [
      animate('800ms ease',
        style({opacity: 1, transform: 'scale(1) translateY(0)'}))
    ])
  ])
])

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideX('left')),
  transition('* => isRight', slideX('right')),
  transition('isRight => *', slideX('left')),
  transition('isLeft => *', slideX('right')),
  transition('* => isTop', slideY('bottom')),
  transition('* => isBottom', slideY('top')),
  transition('isBottom => *', slideY('top')),
  transition('isTop => *', slideY('bottom'))

])

function slideX(direction: string) {
  const optional = {optional: true}
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({[direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('1s ease', style({[direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('1s ease', style({ [direction]: '0%'}))
      ])
    ])
  ];
}

function slideY(direction: string) {
  const optional = {optional: true}
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({[direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('1s ease', style({[direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('1s ease', style({ [direction]: '0%'}))
      ])
    ])
  ];
}

export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('300ms', style({ opacity: 1 }))
]);

export const fadeOut = animation([
  animate('300ms', style({ opacity: 0 }))
]);