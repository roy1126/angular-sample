import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  url = "https://ng-recipe-book-32175-default-rtdb.firebaseio.com/recipes.json";

  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.url, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      // 3
      map((recipes) => {
        return recipes.map((recipe) => {
          // console.log(recipe.ingredients);
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      // 4
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
