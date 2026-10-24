import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from "@angular/core";
import { ProjectArtComponent } from "./project-art.component";
import { IconComponent } from "./icon.component";

interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  type: string;
  intro: string;
  task: string;
  solution: string;
  details: { title: string; text: string }[];
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ProjectArtComponent, IconComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  readonly filters = ["Все проекты", "Интерфейсы", "Веб-дизайн", "Обложки"];
  readonly filter = signal("Все проекты");
  readonly menuOpen = signal(false);
  readonly selectedProject = signal<Project | null>(null);
  readonly briefOpen = signal(false);
  readonly briefDownloaded = signal(false);
  readonly currentYear = new Date().getFullYear();
  @ViewChild("projectDialog") projectDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("briefDialog") briefDialog!: ElementRef<HTMLDialogElement>;
  private returnFocus: HTMLElement | null = null;

  readonly projects: Project[] = [
    {
      id: "dstu",
      number: "01",
      name: "DSTU Connect",
      description: "Университет становится ближе",
      category: "Интерфейсы",
      tags: ["UI/UX", "Айдентика", "Веб-приложение"],
      type: "Участие в командном проекте",
      intro:
        "Единое пространство студенческой жизни. Понятное с первого знакомства, удобное каждый день.",
      task: "Объединить разделы студенческого сервиса общим визуальным языком. Помочь студентам быстро ориентироваться в интерфейсе и находить нужное без лишних действий.",
      solution:
        "В проекте я отвечаю за внешний вид, логотип и удобство интерфейса. Работаю над единообразием разделов, визуальной иерархией и понятной навигацией. Представленный экран — авторская визуализация направления, а не скриншот работающего сервиса.",
      details: [
        {
          title: "Общий визуальный язык",
          text: "Повторяемые компоненты, единая типографика и согласованные состояния элементов делают разделы частью одного продукта.",
        },
        {
          title: "Понятная навигация",
          text: "Основные действия заметны сразу. Содержание сгруппировано по задачам студентов, а не по внутренней структуре сервиса.",
        },
        {
          title: "Характер бренда",
          text: "Логотип и выразительная цветовая система связывают интерфейс с идеей современного студенческого сообщества.",
        },
      ],
    },
    {
      id: "orbit",
      number: "02",
      name: "Orbit",
      description: "Личные финансы без лишнего шума",
      category: "Интерфейсы",
      tags: ["UI/UX", "Мобильное приложение"],
      type: "Демонстрационный концепт",
      intro:
        "Мобильное приложение, которое помогает разобраться в финансах и сохранить ощущение контроля.",
      task: "Спроектировать спокойный и понятный интерфейс для ежедневных операций: просмотра баланса, переводов и анализа расходов.",
      solution:
        "На главный экран вынесены баланс и частые действия. Аналитика раскрывается постепенно, а цвет помогает замечать важное. Концепт создан для портфолио на основе опыта работы с мобильными интерфейсами; он не представляет выпущенный продукт или реального заказчика.",
      details: [
        {
          title: "Главное — на первом экране",
          text: "Баланс, быстрый перевод и последние операции доступны без поиска по вложенным разделам.",
        },
        {
          title: "Данные без перегрузки",
          text: "Круговая диаграмма и ясные подписи помогают оценить структуру расходов одним взглядом.",
        },
        {
          title: "Спокойная визуальная система",
          text: "Светлая палитра, мягкий зелёный акцент и крупные суммы поддерживают ощущение порядка.",
        },
      ],
    },
    {
      id: "forma",
      number: "03",
      name: "Forma",
      description: "Цифровое пространство для ручной работы",
      category: "Веб-дизайн",
      tags: ["Веб-дизайн", "Арт-дирекшн"],
      type: "Демонстрационный концепт",
      intro:
        "Сайт керамической студии, в котором есть место фактуре, несовершенству и тишине.",
      task: "Передать характер предметов ручной работы через цифровую среду и создать выразительную основу для знакомства с коллекцией.",
      solution:
        "Большие изображения, тёплые природные оттенки и контрастная типографика формируют неторопливый ритм. Концепт создан для портфолио на основе опыта разработки макетов сайтов; студия Forma здесь — вымышленный бренд.",
      details: [
        {
          title: "Продукт в центре внимания",
          text: "Свободное пространство и крупный масштаб фотографии дают рассмотреть материал и форму.",
        },
        {
          title: "Редакционная подача",
          text: "Контраст гротеска и антиквы задаёт характер, а короткие тексты раскрывают философию студии.",
        },
        {
          title: "Продуманный путь",
          text: "От первого впечатления к коллекции, истории мастерской и подробностям об отдельном предмете.",
        },
      ],
    },
    {
      id: "frame",
      number: "04",
      name: "Вне кадра",
      description: "Впечатление начинается до первого кадра",
      category: "Обложки",
      tags: ["YouTube", "Графический дизайн"],
      type: "Демонстрационный концепт",
      intro:
        "Серия обложек для канала о путешествиях и поиске нового. Одна система — разные истории.",
      task: "Сделать ролики узнаваемыми в ленте и передавать тему выпуска с помощью короткого, выразительного визуального сообщения.",
      solution:
        "Крупная типографика, контрастный лаймовый акцент и единая композиционная сетка объединяют серию. Это демонстрационный проект на основе опыта создания YouTube-обложек, а не оформление реального канала.",
      details: [
        {
          title: "Читаемость в малом размере",
          text: "Короткий заголовок и ясная иерархия сохраняют смысл даже в небольшой карточке видео.",
        },
        {
          title: "Узнаваемая серия",
          text: "Постоянные элементы айдентики связывают выпуски, оставляя пространство для новых сюжетов.",
        },
        {
          title: "Визуальное напряжение",
          text: "Контраст фотографии, цвета и масштаба поддерживает историю и привлекает внимание к теме.",
        },
      ],
    },
  ];

  get visibleProjects(): Project[] {
    return this.projects.filter(
      (project) =>
        this.filter() === "Все проекты" || project.category === this.filter(),
    );
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  openProject(project: Project): void {
    this.returnFocus = document.activeElement as HTMLElement;
    this.selectedProject.set(project);
    this.projectDialog.nativeElement.showModal();
    document.body.style.overflow = "hidden";
    this.projectDialog.nativeElement.scrollTop = 0;
  }

  closeProject(): void {
    this.projectDialog.nativeElement.close();
    this.selectedProject.set(null);
    document.body.style.overflow = "";
    this.returnFocus?.focus({ preventScroll: true });
  }

  openBrief(): void {
    this.returnFocus = document.activeElement as HTMLElement;
    this.briefDownloaded.set(false);
    this.briefOpen.set(true);
    this.briefDialog.nativeElement.showModal();
    document.body.style.overflow = "hidden";
  }

  closeBrief(): void {
    this.briefDialog.nativeElement.close();
    this.briefOpen.set(false);
    document.body.style.overflow = "";
    this.returnFocus?.focus({ preventScroll: true });
  }

  backdropClick(event: MouseEvent, type: "project" | "brief"): void {
    if (event.target === event.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        type === "project" ? this.closeProject() : this.closeBrief();
      }
    }
  }

  downloadBrief(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const content = [
      "БРИФ НА ДИЗАЙН-ПРОЕКТ",
      "Для Кирилла Сорокина",
      "",
      `Имя: ${data.get("name")}`,
      `Контакт: ${data.get("contact")}`,
      `Тип проекта: ${data.get("type")}`,
      "",
      "Описание задачи:",
      String(data.get("message")),
      "",
      `Дата: ${new Date().toLocaleDateString("ru-RU")}`,
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "brief-kirill-sorokin.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.briefDownloaded.set(true);
  }

  @HostListener("window:resize") onResize(): void {
    if (window.innerWidth > 760) this.menuOpen.set(false);
  }
}
