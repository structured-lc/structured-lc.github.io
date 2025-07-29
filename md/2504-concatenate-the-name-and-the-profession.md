### Leetcode 2504 (Easy): Concatenate the Name and the Profession [Practice](https://leetcode.com/problems/concatenate-the-name-and-the-profession)

### Description  
Given a table `Person` with columns `person_id`, `name`, and `profession`, create a new column in the output called `name` by concatenating:
- the *name* value,
- an opening parenthesis `'('`,
- the first letter of the *profession*,
- a closing parenthesis `')'`.

Return the `person_id` and the new *name* for each row. Sort the results by `person_id` in descending order.

### Examples  

**Example 1:**  
Input:  
```
| person_id | name  | profession  |
|-----------|-------|-------------|
|    1      | Bob   | Player      |
|    2      | Alice | Coder       |
```
Output:  
```
| person_id | name      |
|-----------|-----------|
|    2      | Alice(C)  |
|    1      | Bob(P)    |
```
*Explanation:  
For Alice, the profession starts with 'C', so output is Alice(C).  
For Bob, the profession starts with 'P', so output is Bob(P).  
Rows are returned in descending order of person_id.*

**Example 2:**  
Input:  
```
| person_id | name   | profession  |
|-----------|--------|-------------|
|    10     | John   | Manager     |
|     9     | Sarah  | Analyst     |
```
Output:  
```
| person_id | name      |
|-----------|-----------|
|   10      | John(M)   |
|    9      | Sarah(A)  |
```
*Explanation:  
Take the first letter from the profession, concatenate with name inside parentheses. Sorted descending by person_id.*

**Example 3:**  
Input:  
```
| person_id | name   | profession  |
|-----------|--------|-------------|
|    5      | Max    | Doctor      |
```
Output:  
```
| person_id | name    |
|-----------|---------|
|   5       | Max(D)  |
```
*Explanation:  
Only one person; just concatenate name with (first letter of profession).*

### Thought Process (as if you’re the interviewee)  
- The operation is a *simple string concatenation* task for each row.
- For every row, I need to:
  - Get the name.
  - Get the first character from profession.
  - Build the new string in the format: `name(first-letter-of-profession)`.

- If using SQL, I’d use string concatenation functions (`CONCAT`), substring extraction (for the first letter), and finally a sort by `person_id` descending.

- There are no nested logic or aggregations—just mapping each input row to a transformed output row.

- There’s only one sensible way to do this, with minimal complexity. The trade-offs are minimal as everything is O(n).

### Corner cases to consider  
- Empty table: Should return empty.
- Profession is an empty string or NULL: Need to ensure extraction doesn’t error, handle gracefully.
- Name is an empty string or NULL: Should still return the parenthesis and letter.
- Profession is a single letter: Works, no special case needed.
- Very long names or professions: As long as memory permits, concatenation logic remains.

### Solution

```python
# Simulate what this would look like in Python
# Assume input is a list of dicts representing table rows
# E.g. [{'person_id': 2, 'name': 'Alice', 'profession': 'Coder'}, ...]

def concatenate_name_and_profession(persons):
    result = []
    # Sort descending by person_id
    persons_sorted = sorted(persons, key=lambda x: x['person_id'], reverse=True)
    for row in persons_sorted:
        name = row.get('name', '') or ''
        profession = row.get('profession', '') or ''
        # Safely get first character of profession, if non-empty
        first_letter = profession[0] if profession else ''
        # Concatenate as required
        concatenated = f"{name}({first_letter})"
        result.append({'person_id': row['person_id'], 'name': concatenated})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — due to sorting by person_id (n rows sorted).
- **Space Complexity:** O(n) — output requires storage for all n processed rows.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle NULL values for name or profession?  
  *Hint: Think about using a default value or checking for None/null in your transformation logic.*

- What if there are duplicate person_ids in the table?  
  *Hint: Should the output include both, only one, or throw an error?*

- Could you solve this in-place in SQL without creating new temporary columns?  
  *Hint: Use only SELECT and string functions, no temp tables.*

### Summary
This problem is a *row-wise string transformation and sorting* task. It’s a direct application of string manipulation, common in SQL interview problems and sometimes seen in ETL data-cleaning tasks. The pattern—element wise transformation plus sorting—is foundational for SQL-based reporting and can extend to many business data scenarios.