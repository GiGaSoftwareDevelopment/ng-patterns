import { execSync } from 'child_process';
import {
  publishableLevel_0,
  publishableLevel_1,
  publishableLevel_2,
  publishableLevel_3,
  publishableLevel_4, publishableLevel_5
} from './build/_build.config';
import { UiUxProcessQueue } from '../../libs/packages/utils/src/lib/process-queue';

``
const p: UiUxProcessQueue<string> =
  new UiUxProcessQueue();

p.currentItem$.subscribe((project: string) => {

  console.log(
    `\nexecuting npx nx run ${project}:docs\n`
  );

  try {
    const res= execSync(
      `npx nx run ${project}:docs`
    );
    console.log(res.toString())

  }
  catch (err: any){
    console.log("output",err)
    console.log("sdterr",err.stderr.toString())
  }
  finally {
    p.next();
  }

});

p.addItems([
  ...publishableLevel_0,
  ...publishableLevel_1,
  ...publishableLevel_2,
  ...publishableLevel_3,
  ...publishableLevel_4,
  ...publishableLevel_5
]);


