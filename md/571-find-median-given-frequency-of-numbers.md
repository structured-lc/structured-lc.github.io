### Leetcode 571 (Hard): Find Median Given Frequency of Numbers [Practice](https://leetcode.com/problems/find-median-given-frequency-of-numbers)

### Description  
Given a table where each row records a number and how many times it appears (its frequency), find the median of the full (virtual) sorted list that would result from expanding those frequencies.  
You are not given the list of actual numbers, only their frequencies, so you need to compute the median efficiently using only the frequency information.

### Examples  

**Example 1:**  
Input:  
Numbers table:
```
| num | frequency |
|-----|-----------|
|  0  |     7     |
|  1  |     1     |
|  2  |     3     |
|  3  |     1     |
```
Output: `0`  
Explanation: The expanded list is `[0,0,0,0,0,0,0,1,2,2,2,3]` (7 zeroes, 1 one, 3 twos, 1 three).  
There are 12 elements, even, so the median is at positions 6 and 7 (1-based, zero-based: 5 and 6). Both are '0', so median = (0+0)/2 = `0`.


**Example 2:**  
Input:  
Numbers table:
```
| num | frequency |
|-----|-----------|
|  2  |     1     |
|  5  |     2     |
|  9  |     1     |
```
Output: `5`  
Explanation: Expanded list is `[2,5,5,9]`. The two medians are at positions 2 and 3 (values 5 and 5), so median = (5+5)/2 = `5`.


**Example 3:**  
Input:  
Numbers table:
```
| num | frequency |
|-----|-----------|
|  1  |     1     |
|  2  |     1     |
|  3  |     1     |
```
Output: `2`  
Explanation: Expanded list: `[1,2,3]`. Odd number of elements, so median is at position 2 (zero-based position 1), which is `2`.


### Thought Process (as if you’re the interviewee)  
- First, if we actually built the full list, we could just sort it and pick the median(s). But with large frequencies, this is extremely inefficient.
- Since the data is stored as (number, frequency), we should take advantage:
  - Compute the total count of values.
  - The median's position(s) depend on whether total count is odd or even.
    - Odd: single middle index.
    - Even: average of two middle numbers.
  - Walk through the numbers in order, maintaining a running total of frequencies, and find where the median position(s) fall in this cumulative count.
- We must handle both odd and even lengths: for an even number n, median is average of values at positions ⌊n/2⌋ and ⌊n/2⌋+1 (1-based positions).
- The key: Instead of expanding the list, compute **cumulative frequency** and stop when you reach (or pass) the median positions, reading the corresponding number(s).

### Corner cases to consider  
- Only one unique number with frequency ≥1 (single element).
- All numbers have frequency 0 (illegal in most cases, but possible edge input).
- Frequencies are extremely large (test efficiency).
- Large gaps between numbers (should not affect logic).
- Multiple numbers sharing the median position in expanded representation (even count, frequency splits).
- Negative numbers.
- Numbers not sorted in table (handle in code).

### Solution

```python
def find_median(numbers):
    """
    numbers: List of [num, frequency] entries, 
    e.g. [[0,7], [1,1], [2,3], [3,1]]
    Returns median as float/int.
    """

    # 1. Sort by the number value
    numbers.sort(key=lambda x: x[0])

    # 2. Compute total number of entries (expanded length)
    total = sum(freq for _, freq in numbers)

    # 3. Compute the median positions
    # For list of length n, median positions:
    #   Odd: at pos = n // 2 (zero-based)
    #   Even: at pos = n//2 - 1, n//2 (zero-based) -> need both and take avg
    
    if total % 2 == 1:
        median_pos = total // 2    # zero-based
        left, right = median_pos, median_pos
    else:
        left = total // 2 - 1
        right = total // 2

    # 4. Iterate through the frequencies to find correct numbers
    current = 0
    target_vals = []
    for num, freq in numbers:
        prev = current
        current += freq
        # If our median position(s) are in this cumulative range
        while (left >= prev and left < current) or (right >= prev and right < current):
            if left >= prev and left < current:
                target_vals.append(num)
                left = float('inf')  # avoid double counting
            elif right >= prev and right < current:
                target_vals.append(num)
                right = float('inf')
        # Stop if found both positions
        if len(target_vals) == 2 or (total % 2 == 1 and len(target_vals) == 1):
            break

    # 5. Return the average (if even), or the single value
    if len(target_vals) == 2:
        return (target_vals[0] + target_vals[1]) / 2.0
    else:
        return float(target_vals[0])  # as float for consistency

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of distinct numbers (rows). We must sort (if needed), which is O(n log n), but if already sorted or very small `n` (compared to possible expansion), this is optimal.
- **Space Complexity:** O(1) extra space—no extra arrays proportional to input size are created, only a handful of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to support dynamic additions—finding median as numbers are added?
  *Hint: Consider data structures like heaps to track the left and right halves in real-time.*

- What if instead of median you need the kᵗʰ smallest element?  
  *Hint: It’s a generalization—adjust the position calculation.*

- Can you handle this if the input data is streamed and you can't store everything?  
  *Hint: Use summary statistics, or heap/queue for the top elements.*

### Summary
We solved the problem using a **prefix sum / cumulative frequency** pattern common in histogram/weighted list questions. Instead of expanding the data, we efficiently used prefix sums to locate the median positions, dramatically reducing both time and space usage. This approach frequently appears in data stream algorithms, quantile calculations, and histogram queries.


### Flashcard
Walk through sorted (number, frequency) pairs, accumulating counts to find the median position(s) without building the full list.

### Tags
Database(#database)

### Similar Problems
- Median Employee Salary(median-employee-salary) (Hard)