// import { redirect } from 'next/navigation';

// // This page only renders when the app is built statically (output: 'export')
// export default function RootPage() {
//   redirect('/ro');
// }

import { redirect } from "next/navigation";

export default function RootPage() {
  // Проверяем, находимся ли мы на корневом маршруте (корень сайта `/`)

  if (typeof window !== "undefined" && window.location.pathname === "/") {
    redirect("/en"); // Выполняем редирект только с корня
  } else {
    console.log(window.location);
  }

  // Альтернативно можно ничего не возвращать для предотвращения дальнейшего рендера
  return null;
}
