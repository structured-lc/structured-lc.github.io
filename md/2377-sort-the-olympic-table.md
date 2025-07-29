### Leetcode 2377 (Easy): Sort the Olympic Table [Practice](https://leetcode.com/problems/sort-the-olympic-table)

### Description  
Given a table (list) of Olympic medal counts for different countries, **sort the table by**:
- First, the number of gold medals (descending order).
- Then, for ties, by the number of silver medals (descending).
- Next, for further ties, by the number of bronze medals (descending).
- Finally, if all medal counts tie, order by country name (ascending lexicographic).

You are to implement this multi-key sort, as you might do in a SQL table or a list of dicts/arrays in Python.

### Examples  

**Example 1:**  
Input:  
`[["USA", 10, 5, 3], ["China", 10, 5, 3], ["Japan", 8, 8, 10]]`  
Output:  
`[["China", 10, 5, 3], ["USA", 10, 5, 3], ["Japan", 8, 8, 10]]`  
*Explanation: USA and China have the same medals, but "China" comes before "USA" alphabetically.*

**Example 2:**  
Input:  
`[["USA", 10, 8, 2], ["China", 10, 6, 8], ["Japan", 8, 8, 10]]`  
Output:  
`[["USA", 10, 8, 2], ["China", 10, 6, 8], ["Japan", 8, 8, 10]]`  
*Explanation: USA has more silver than China, so USA comes before China.*

**Example 3:**  
Input:  
`[["India", 1, 0, 0], ["Nepal", 1, 0, 0], ["Bangladesh", 1, 0, 0]]`  
Output:  
`[["Bangladesh", 1, 0, 0], ["India", 1, 0, 0], ["Nepal", 1, 0, 0]]`  
*Explanation: All countries have same medal counts; order by name alphabetically.*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to sort a list of records by multiple keys:
- gold descending,
- then silver descending,
- then bronze descending,
- then country name ascending.

The brute-force way is to compare each pair and insert them in the correct position, but that's inefficient (O(n²)).  
Python’s sort with a custom key function lets us express all these comparators simply in one pass (O(n log n)), matching the best possible for comparison-based sorts.

To avoid using libraries/operators that aren't allowed, I’ll write out the key comparator manually using tuples, and I'll negate the medal counts so that larger numbers come first for gold, silver, and bronze.

Choosing this way is optimal in time and concise, and avoids edge cases from, say, sorting iteratively by single columns.

### Corner cases to consider  
- Empty input list.
- All countries have exact same medal counts and names (duplicates).
- Leading/trailing spaces in country names (do we trim?).
- Mixed letter casing ("USA" vs. "Usa" - problem likely says use straight lex order).
- Large numbers of countries.

### Solution

```python
def sortOlympicTable(table):
    # Helper function for sort keys:
    # - Use negative medals for descending.
    # - Country name for ascending.
    def sort_key(row):
        # row = [country, gold, silver, bronze]
        return (-row[1], -row[2], -row[3], row[0])

    # Sort in-place or return new sorted
    return sorted(table, key=sort_key)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Because sorting a list of n elements with tuple-comparisons is O(n log n).

- **Space Complexity:** O(n)  
  Due to storing the sorted result; key function uses O(1) extra space per compare.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you do this in-place without extra space?  
  *Hint: Use the `sort()` method if allowed, which modifies the list without additional storage.*

- What if there are millions of entries, and each row is very large?  
  *Hint: Consider sorting by pointer/reference or using an external sort if data can't fit in memory.*

- How to implement this if only allowed to compare two rows at a time?  
  *Hint: Write a custom comparison function and use a sort that supports `cmp`-style callbacks.*

### Summary
This is a classic **multi-key sorting** problem, often seen in leaderboard, table, or event ranking logic. The solution leverages tuple sort keys to express composite ordering efficiently. This coding pattern is broadly applicable wherever you need stable, weighted, or lexicographical ordering across several columns or attributes (e.g., job scheduling, leaderboard, or database-like logic).