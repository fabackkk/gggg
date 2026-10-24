import { Component, input } from "@angular/core";
import { IconComponent } from "./icon.component";

@Component({
  selector: "app-project-art",
  standalone: true,
  imports: [IconComponent],
  template: `
    @switch (kind()) {
      @case ("dstu") {
        <div class="project-art dstu-art" aria-hidden="true">
          <div class="art-grain"></div>
          <span class="art-corner">ЦИФРОВОЙ КАМПУС</span>
          <span class="dstu-wordmark"
            ><span class="connect-symbol"><app-icon name="arrow" /></span>
            DSTU<span>Connect</span></span
          >
          <div class="dstu-orbit orbit-one"></div>
          <div class="dstu-orbit orbit-two"></div>
          <div class="campus-app">
            <aside class="campus-sidebar">
              <b class="campus-mark"
                >d<span><app-icon name="arrow" /></span
              ></b>
              <span class="side-active">▦</span><span>▤</span><span>▣</span
              ><span>◉</span>
              <span class="sidebar-bottom">КС</span>
            </aside>
            <div class="campus-content">
              <div class="campus-top">
                <b>Мой кампус</b><span>⌕ &nbsp; ♧ &nbsp; <i>К</i></span>
              </div>
              <p class="campus-greeting">
                Привет, Кирилл <span><app-icon name="star" /></span>
              </p>
              <span class="campus-subtitle">Всё важное — в одном месте</span>
              <div class="campus-banner">
                <b>Твой университет.<br />Твои возможности.</b
                ><span>Узнать больше <app-icon name="arrow" /></span
                ><i><app-icon name="star" /></i>
              </div>
              <div class="campus-section-label">
                <b>Сегодня, 24 октября</b
                ><span>Всё расписание <app-icon name="arrow" /></span>
              </div>
              <div class="lesson">
                <span>09:00<br /><small>10:30</small></span>
                <div>
                  <b>Проектирование интерфейсов</b
                  ><small>Практика · ауд. 7–312</small>
                </div>
                <i></i>
              </div>
              <div class="lesson">
                <span>10:45<br /><small>12:15</small></span>
                <div>
                  <b>Компьютерная графика</b><small>Лекция · ауд. 2–204</small>
                </div>
                <i></i>
              </div>
              <div class="campus-news">
                <div>
                  <span>СОБЫТИЯ</span
                  ><b>Создавай. Общайся.<br />Будь в центре.</b>
                </div>
                <div class="news-lime">
                  День<br />дизайна <span><app-icon name="arrow" /></span>
                </div>
              </div>
            </div>
          </div>
          <div class="floating-notice">
            <span>✓</span>
            <div>
              <b>Всё под рукой</b><small>Расписание, новости и люди</small>
            </div>
          </div>
          <span class="art-bottom">Единая среда. Большие возможности.</span>
        </div>
      }
      @case ("orbit") {
        <div class="project-art orbit-art" aria-hidden="true">
          <div class="art-grain"></div>
          <span class="art-corner">МЕНЬШЕ ШУМА. БОЛЬШЕ КОНТРОЛЯ.</span>
          <div class="orbit-brand">
            orbit<span>®</span>
            <p>Деньги в твоём ритме.</p>
          </div>
          <div class="orbit-ring ring-one"></div>
          <div class="orbit-ring ring-two"></div>
          <div class="phone phone-back">
            <div class="phone-notch"></div>
            <div class="phone-status">9:41 <span>▰</span></div>
            <div class="phone-heading">
              Аналитика <span><app-icon name="arrow" /></span>
            </div>
            <p class="phone-caption">Расходы за октябрь</p>
            <b class="phone-amount">32 450 <span>₽</span></b>
            <div class="donut-chart">
              <div>Всё<br /><b>под контролем</b></div>
            </div>
            <div class="chart-legend">
              <span><i></i> Покупки</span><b>42%</b>
            </div>
            <div class="chart-legend">
              <span><i></i> Кафе и рестораны</span><b>28%</b>
            </div>
            <div class="phone-tip">
              Небольшие шаги.<br /><b
                >Большие возможности. <app-icon name="arrow"
              /></b>
            </div>
          </div>
          <div class="phone phone-front">
            <div class="phone-notch"></div>
            <div class="phone-status">9:41 <span>▰</span></div>
            <div class="phone-greeting">
              <span
                >Привет, Кирилл <b><app-icon name="star" /></b></span
              ><i>К</i>
            </div>
            <p class="phone-caption">Твой баланс</p>
            <b class="phone-amount">124 580 <span>₽</span></b
            ><span class="balance-trend"
              ><app-icon name="arrow" /> Всё идёт по плану</span
            >
            <div class="bank-card">
              <span>orbit <small>debit</small></span
              ><b>•••• &nbsp; 2048</b><i>◔</i>
            </div>
            <div class="phone-actions">
              <div>
                <b><app-icon name="arrow" /></b>Перевести
              </div>
              <div><b>＋</b>Пополнить</div>
              <div><b>▦</b>Ещё</div>
            </div>
            <div class="transactions">
              <b
                >Последние операции <span>Все <app-icon name="arrow" /></span
              ></b>
              <div>
                <i><app-icon name="arrow" /></i
                ><span>Кофе и хорошее утро<small>Сегодня, 09:12</small></span
                ><strong>− 280 ₽</strong>
              </div>
              <div>
                <i>↓</i><span>Пополнение<small>Вчера, 18:40</small></span
                ><strong>+ 15 000 ₽</strong>
              </div>
            </div>
            <div class="phone-nav">
              <span>▦</span><span>◉</span><span>▣</span><span>○</span>
            </div>
          </div>
          <span class="orbit-spark"><app-icon name="star" /></span>
          <span class="art-bottom">Финансы, с которыми спокойно.</span>
        </div>
      }
      @case ("forma") {
        <div class="project-art forma-art" aria-hidden="true">
          <div class="art-grain"></div>
          <span class="art-corner">ЦИФРОВАЯ ФОРМА РУЧНОЙ РАБОТЫ</span>
          <div class="ceramic-browser">
            <div class="browser-toolbar">
              <i></i><i></i><i></i><span>forma — objects with soul</span>
            </div>
            <div class="ceramic-nav">
              <b>forma.</b><span>Коллекция &nbsp; О студии &nbsp; Контакты</span
              ><i>Корзина (0)</i>
            </div>
            <div class="ceramic-hero">
              <div class="ceramic-copy">
                <small>КЕРАМИКА РУЧНОЙ РАБОТЫ</small>
                <h3>Несовершенство.<br />В нём —<br /><em>красота.</em></h3>
                <p>Предметы, которые делают<br />обычный день особенным.</p>
                <span>Найти свою форму <app-icon name="arrow" /></span>
              </div>
              <img
                src="images/ceramics.svg"
                alt=""
                loading="lazy"
                width="600"
                height="700"
              /><span class="ceramic-seal"
                >MADE<br />WITH<br />LOVE <app-icon name="star"
              /></span>
            </div>
            <div class="ceramic-bottom">
              <span>Из земли. С заботой. Надолго.</span
              ><b>Каждый предмет — немного искусство.</b>
            </div>
          </div>
          <span class="art-bottom">Тактильность, перенесённая на экран.</span>
        </div>
      }
      @case ("frame") {
        <div class="project-art frame-art" aria-hidden="true">
          <div class="art-grain"></div>
          <span class="art-corner">ВИЗУАЛ, КОТОРЫЙ ХОЧЕТСЯ ОТКРЫТЬ</span>
          <div class="frame-brand">
            ВНЕ<span>КАДРА</span><i><app-icon name="arrow" /></i>
          </div>
          <div class="video-thumbnail thumbnail-back">
            <img
              src="images/mountains.svg"
              alt=""
              loading="lazy"
              width="1000"
              height="620"
            /><b>ВЫШЕ<br /><span>ОБЛАКОВ</span></b
            ><small>18:24</small
            ><span class="thumbnail-label">ВНЕ КАДРА / 02</span>
          </div>
          <div class="video-thumbnail thumbnail-front">
            <img
              src="images/mountains.svg"
              alt=""
              loading="lazy"
              width="1000"
              height="620"
            /><span class="thumbnail-label">ВНЕ КАДРА / 01</span
            ><b>ВЫЙДИ<br />ЗА <span>РАМКИ.</span></b>
            <div class="thumbnail-arrow"><app-icon name="arrow" /></div>
            <small>12:48</small>
          </div>
          <span class="frame-star"><app-icon name="star" /></span
          ><span class="art-bottom">Одна идея. Узнаваемый стиль.</span>
        </div>
      }
    }
  `,
})
export class ProjectArtComponent {
  readonly kind = input.required<string>();
}
