import { Component, input } from "@angular/core";

@Component({
  selector: "app-icon",
  standalone: true,
  template: `
    @if (name() === "star") {
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M50 6v88M6 50h88M19 19l62 62M19 81l62-62"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
    } @else {
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        [style.transform]="
          name() === 'arrow-down-left' ? 'rotate(180deg)' : null
        "
      >
        <path
          d="M5 19 19 5M5 5h14v14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    }
  `,
})
export class IconComponent {
  readonly name = input("arrow");
}
