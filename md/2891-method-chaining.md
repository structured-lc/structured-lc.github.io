### Leetcode 2891 (Easy): Method Chaining [Practice](https://leetcode.com/problems/method-chaining)

### Description  
You are given a Pandas DataFrame called `animals`, where each row represents an animal and contains information such as `'name'`, `'weight'`, and possibly other attributes. The task is to output a DataFrame containing only the names of animals whose `weight` is strictly greater than 100 units, sorted by `weight` in descending order. All processing must be done in a *single line* using method chaining, without creating extra variables. This demonstrates concise and idiomatic data manipulation in Pandas.

### Examples  

**Example 1:**  
Input:  
A DataFrame with rows:  
[["Elephant", 5000, "Savanna"], ["Giraffe", 1200, "Savanna"], ["Lion", 150, "Savanna"], ["Rabbit", 5, "Forest"], ["Bear", 300, "Forest"]]  
Output:  
```
       name
0  Elephant
1   Giraffe
2      Bear
3      Lion
```
*Explanation: Only animals with weight > 100 are selected, then sorted in descending weight (Elephant > Giraffe > Bear > Lion). Only the 'name' column is returned, matching the sorted order.*

**Example 2:**  
Input:  
[["Mouse", 0.3, "House"], ["Cat", 4, "House"], ["Dog", 35, "House"]]  
Output:  
```
Empty DataFrame
Columns: [name]
Index: []
```
*Explanation: All animals weigh ≤ 100, so the result is an empty DataFrame with only the 'name' column.*

**Example 3:**  
Input:  
[["Pig", 200, "Farm"], ["Sheep", 110, "Farm"], ["Chicken", 2, "Farm"], ["Cow", 700, "Farm"]]  
Output:  
```
    name
0    Cow
1    Pig
2  Sheep
```
*Explanation: Cow (700), Pig (200), Sheep (110) all pass the weight threshold. Sorted as Cow > Pig > Sheep, and only the 'name' column is returned.*

### Thought Process (as if you’re the interviewee)  
First, I need to filter out all animals weighing more than 100 units.  
Next, I must sort this filtered list in descending order of `weight` so the heaviest animals come first.  
Finally, I need to return only the `'name'` column of the qualifying animals.  
Pandas makes it possible to chain these operations in a single line using DataFrame indexing, `.sort_values`, and selecting columns.  
There’s no need for loops or intermediate variables.  
This method chaining keeps the code:
- Short and readable,
- Clearly expresses the intent (filter, sort, select),
- Efficiently leverages Pandas’ built-in capabilities.

### Corner cases to consider  
- The DataFrame could be empty, or no animal has weight > 100 (should return an empty DataFrame with just the `'name'` column).
- Multiple animals can have the same weight (should preserve overall sort order, but ties can appear in any order among themselves).
- DataFrame may have other columns; those must be ignored in output.
- If an animal’s weight is exactly 100, it must NOT be included.
- The input may already be sorted or unordered.

### Solution

```python
import pandas as pd

def findHeavyAnimals(animals: pd.DataFrame) -> pd.DataFrame:
    # Filter animals with weight > 100,
    # sort by weight descending,
    # and select only the name column, all in one chained line.
    return animals[animals['weight'] > 100].sort_values('weight', ascending=False)[['name']]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Filtering the DataFrame takes O(n) where n is the number of rows.
  - Sorting (on filtered data, up to O(n)) takes O(n log n).
  - Selecting the column is O(n).
  - **Overall:** O(n log n), dominated by sorting.

- **Space Complexity:**  
  - The main space usage is for the output DataFrame, which in the worst case is O(n).
  - No significant extra space is allocated, as operations return new views or copies as needed.

### Potential follow-up questions (as if you’re the interviewer)  

- If animals can have missing (`NaN`) weights, how should those rows be handled?
  *Hint: Consider using `.dropna()` or add checks for missing values in chaining.*
- What if we want to return both the name and weight columns (not just the name)?
  *Hint: Adjust the final selection step in the chain to include additional columns.*
- How would you implement the same logic if the data was stored in a list of dictionaries, not a DataFrame?
  *Hint: Consider using the `filter` and `sorted` functions in basic Python, or use a list comprehension.*

### Summary
This problem demonstrates *method chaining*, a concise and highly readable approach in Pandas for sequencing multiple DataFrame operations. The pattern is widely used for data cleaning and transformation tasks: filter → sort → select. Mastering method chaining is handy for writing efficient, maintainable data analysis code both in interviews and real-world settings.


### Flashcard
Chain filtering (weight > 100), sorting (descending by weight), and column selection ('name') in pandas for concise result.

### Tags

### Similar Problems
