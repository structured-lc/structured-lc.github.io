### Leetcode 3140 (Medium): Consecutive Available Seats II [Practice](https://leetcode.com/problems/consecutive-available-seats-ii)

### Description  
Given a 2D array representing the seats in a cinema, where `0` means **an available seat** and `1` means **an occupied seat**, determine if in **every row** of the array, there exists at least one pair of **two consecutive available seats** (i.e., two adjacent `0`s). Return `True` if this condition is satisfied for **all rows**, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `seats = [[1,0,0,1],[1,1,0,0],[0,0,1,1]]`  
Output: `True`  
*Explanation:  
- Row 1: `[1,0,0,1]` → `0,0` at index 1 and 2  
- Row 2: `[1,1,0,0]` → `0,0` at index 2 and 3  
- Row 3: `[0,0,1,1]` → `0,0` at index 0 and 1  
Each row has at least one pair of consecutive available seats.*

**Example 2:**  
Input: `seats = [[1,0,1,1],[1,1,0,1],[0,1,1,1]]`  
Output: `False`  
*Explanation:  
No row has `0,0` in consecutive places.*

**Example 3:**  
Input: `seats = [[0,0],[1,0]]`  
Output: `False`  
*Explanation:  
- Row 1: `[0,0]` → Yes  
- Row 2: `[1,0]` → No*

### Thought Process (as if you’re the interviewee)  
Start by considering what it means for a row to have two consecutive available seats. This simply means that somewhere in the row, there is a `0` immediately followed by another `0`.

Brute-force idea:
- For each row, scan through all pairs of consecutive seats.
- Check if there's any pair `row[i] == 0 and row[i+1] == 0`.
- If any row lacks such a pair, we can immediately return `False`.

Optimization:
- As soon as we find such a pair in a row, move to the next row (no need to scan the rest of that row).
- Similarly, if any row fails, terminate early and return `False`.

Final approach:
- Linear scan for all rows suffices, since each element is checked at most once.

### Corner cases to consider  
- Empty `seats` array (no rows): Should return `True`.
- Row with only one seat: Can't form a pair, so should return `False`.
- Row where all seats are occupied (`1,1,1`): Should return `False`.
- Multiple pairs in one row: Only need to find one, not all pairs.
- Very large matrix: Solution should still perform efficiently.

### Solution

```python
def are_all_rows_has_consecutive_seats(seats):
    for row in seats:
        found_pair = False
        # If row length < 2, can't have 2 consecutive seats
        if len(row) < 2:
            return False
        for i in range(len(row) - 1):
            # Check the pair at i, i+1
            if row[i] == 0 and row[i+1] == 0:
                found_pair = True
                break
        if not found_pair:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n is the maximum length of a row. Each seat is checked at most once per row.
- **Space Complexity:** O(1) extra space, as we only use a few variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code to count **how many rows** have at least one pair of consecutive available seats?  
  *Hint: Use a counter instead of returning early.*

- What if the question asked for at least **k consecutive available seats** in each row, for a given integer `k`?  
  *Hint: Check for a sliding window of `k` zeros in each row.*

- How would you adapt this for a **jagged** seat layout (rows of variable lengths)?  
  *Hint: The approach above already handles variable-length rows, but double-check the logic for edge cases.*

### Summary
The solution uses a **simple linear scan** with early termination, leveraging the sliding window pattern for adjacency detection. This is a common coding pattern useful for substring, subarray, and sequence detection problems, and can also be extended for more general "find k consecutive elements" problems.

### Tags
Database(#database)

### Similar Problems
