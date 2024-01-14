import {CanMatchFn, Route, UrlSegment} from '@angular/router';
import {inject} from "@angular/core";
import {HeaderLinksService} from "../services/header-links.service";
import {MenuItem} from "primeng/api";

export const routerExistGuard: CanMatchFn = (route: Route, state: UrlSegment[]):boolean=> {
  const links: HeaderLinksService = inject(HeaderLinksService);
  let existingRoute:MenuItem | undefined = links.getMenuItems()?.find((route: MenuItem):boolean => route.label?.toLowerCase() === state[0].path);

  return !!existingRoute;
};
