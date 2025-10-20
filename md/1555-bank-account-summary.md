### Leetcode 1555 (Medium): Bank Account Summary [Practice](https://leetcode.com/problems/bank-account-summary)

### Description  
Given a list of bank account records, each record consisting of a person's name and their account value, return a summary where every entry lists the person's name and the sum of all their account values. The summary must be sorted lexicographically by name.

### Examples  

**Example 1:**  
Input: `accounts = [["Alice", 100], ["Bob", 50], ["Alice", 50]]`  
Output: `[["Alice", 150], ["Bob", 50]]`  
*Explanation: Alice has two accounts. The values are summed for total of 150.*

**Example 2:**  
Input: `accounts = [["Charlie", 20], ["Charlie", 30]]`  
Output: `[["Charlie", 50]]`  
*Explanation: Charlie's accounts are merged.*

**Example 3:**  
Input: `accounts = [["Anna", 10], ["Bob", 5]]`  
Output: `[["Anna", 10], ["Bob", 5]]`  
*Explanation: Each name only appears once.*

### Thought Process (as if you’re the interviewee)  
This is a grouping and summing task. Use a dictionary to group values by name and sum account values. Once done, create a sorted list of [name, sum].

Brute force: For every account, for every other, O(n²). But dictionary hashmap makes this O(n).

### Corner cases to consider  
- Multiple accounts with same name
- Names with different case ("bob" vs "Bob" — depends on problem spec)
- Empty list
- Only one person

### Solution

```python
def bankAccountSummary(accounts):
    summary = {}
    for name, value in accounts:
        summary[name] = summary.get(name, 0) + value
    return [[name, summary[name]] for name in sorted(summary)]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), n = number of records. O(n) to build, O(n log n) to sort.
- **Space Complexity:** O(n) for the summary dict.

### Potential follow-up questions (as if you’re the interviewer)  
- What if names can have different letter cases?  
  *Hint: Normalize (lowercase/uppercase) during grouping.*

- What if you need to handle very large data (streaming)?  
  *Hint: Can aggregate in small batches, or use external hash.*

- What if account values could be negative (debts)?  
  *Hint: Just sum as usual, but ensure negative balances are counted.*

### Summary
Hashmap/dictionary grouping and aggregation; pattern is prevalent in database GROUP BY and summary aggregation tasks.


### Flashcard
Use hash map to group by name and sum values; return sorted list of [name, total] pairs in O(n) time.

### Tags
Database(#database)

### Similar Problems
