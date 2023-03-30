export const contactHtmlForm = `

<div class="relative isolate bg-gray-900">
  <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
    <div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:py-48 lg:px-8">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div
          class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
          <svg
            class="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true">
            <defs>
              <pattern
                id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                width="200"
                height="200"
                x="100%"
                y="-1"
                patternUnits="userSpaceOnUse">
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="100%" y="-1" class="overflow-visible fill-gray-800/20">
              <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)" />
          </svg>
          <svg
            class="absolute top-[calc(100%-13rem)] -left-56 w-[72.1875rem] transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
            viewBox="0 0 1155 678"
            aria-hidden="true">
            <path
              fill="url(#0a9a5302-e517-46c6-85f0-d826aa6a313e)"
              fill-opacity=".2"
              d="M317.219 159.025 203.852 0 0 239.659l317.219-80.634 204.172 286.402c1.307-132.337 45.083-346.658 209.733-145.248C936.936 551.942 882.053 772.234 1031.02 636.67c119.18-108.452 130.68-295.338 121.53-375.224L855 379l21.173-362.054-558.954 142.079Z" />
            <defs>
              <linearGradient
                id="0a9a5302-e517-46c6-85f0-d826aa6a313e"
                x1="1155.49"
                x2="-78.208"
                y1="677.823"
                y2="203.355"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#4F46E5" />
                <stop offset="1" stop-color="#80CAFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-white">
          Get in touch
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Get answers to your questions. Request and estimate for customized
          services.
        </p>
        <dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Telephone</span>
              <svg
                class="h-7 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </dt>
            <dd>
              <a class="hover:text-white" href="mailto:info@foo.com"
                >query@foo.com</a
              >
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <form
      [formGroup]="formGroup"
      class="relative px-6 pb-24 pt-20 sm:pb-32 lg:py-48 lg:px-8">
      <mat-progress-bar
        *ngIf="showProgress$ | ngrxPush"
        color="accent"
        mode="indeterminate"
        class="!absolute left-0 right-0 top-0"></mat-progress-bar>
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <mat-form-field appearance="outline">
            <mat-label>First Name</mat-label>
            <input
              matInput
              placeholder="First Name"
              formControlName="firstName" />
            <mat-error *ngIf="firstNameControl.hasError('required')">
              You must enter a value
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Last Name</mat-label>
            <input
              matInput
              placeholder="Last Name"
              formControlName="lastName" />
          </mat-form-field>

          <div class="sm:col-span-2">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput placeholder="Email" formControlName="email" />
              <mat-error *ngIf="emailControl.hasError('required')">
                You must enter a value
              </mat-error>
              <mat-error *ngIf="emailControl.hasError('email')">
                Not a valid email
              </mat-error>
            </mat-form-field>
          </div>
          <div class="sm:col-span-2">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Message</mat-label>
              <textarea
                matInput
                placeholder="Message"
                formControlName="message"
                cdkTextareaAutosize
                cdkAutosizeMinRows="5"></textarea>
              <mat-error *ngIf="messageControl.hasError('required')">
                You must enter a value
              </mat-error>
            </mat-form-field>
          </div>
        </div>
        <div class="mt-8 flex justify-end">
          <button
            mat-flat-button
            color="primary"
            type="button"
            [disabled]="formGroup.invalid"
            (click)="onSubmit()"
            class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Send message
          </button>
        </div>
      </div>
    </form>
  </div>
</div>


`;
