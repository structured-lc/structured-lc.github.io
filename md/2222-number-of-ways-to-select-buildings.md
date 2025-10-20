### Leetcode 2222 (Medium): Number of Ways to Select Buildings [Practice](https://leetcode.com/problems/number-of-ways-to-select-buildings)

### Description  
Given a binary string s, where each character represents a type of building along a street (`'0'` for an office, `'1'` for a restaurant), select exactly 3 buildings for inspection such that no two consecutively selected buildings are of the same type. Count the number of valid ways to select such a triplet of buildings (indexes i, j, k where 0 ≤ i < j < k < n), making sure that the selected types alternate (i.e., patterns: "010" or "101").

### Examples  

**Example 1:**  
Input: `s = "001101"`  
Output: `6`  
*Explanation: The valid ways: (0,2,3) = "010", (0,3,4)="011", invalid (since two consecutive 1's), (1,2,3)="011", invalid, (0,2,5)="001", invalid, (0,4,5)="011", etc. Actual valid triplets are: (0,2,3)="010", (0,2,5)="001", (0,3,4)="011", (1,2,3)="011", (1,2,5)="001", (1,3,4)="011". (Calculation below shows why 6.)

**Example 2:**  
Input: `s = "10101"`  
Output: `4`  
*Explanation: Valid triplets: (0,1,2)="101", (0,1,4)="101", (0,3,4)="101", (2,3,4)="101".

**Example 3:**  
Input: `s = "0101010"`  
Output: `14`  
*Explanation: All disjoint triplets with alternating types (i.e., "010" or "101") are valid. There are 14 such combinations.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Iterate over all triplets (i, j, k) where 0 ≤ i < j < k < n, checking each time if the chars at these positions are alternating ("010" or "101"). This is O(n³), which will not work for large n.

- **Optimize with prefix/suffix counts:**  
  For each possible middle building (index j), consider both alternating patterns:
  - If s[j] == '0', look for "101": number of '1's before j (count of i's where i < j, s[i]='1') × number of '1's after j (count of k's where k > j, s[k]='1').
  - If s[j] == '1', look for "010": number of '0's before j × number of '0's after j.
  By precomputing prefix sums of '0's and '1's we can get these counts in O(1) for any j, achieving O(n) total.

- **Why this approach:**  
  Each triplet is uniquely determined by picking the middle building and choosing its proper left/right alternate pairs. Using prefix/suffix counters removes duplicate counting and is efficient.

### Corner cases to consider  
- s has length < 3 (no valid triplets).
- All buildings are of same type (no valid triplets).
- s = "" (empty street).
- Alternate pattern but not enough buildings, e.g., "01", "10".

### Solution

```python
def numberOfWays(s: str) -> int:
    n = len(s)
    prefix_0 = [0] * n
    prefix_1 = [0] * n
    
    # Precompute prefix counts for '0' and '1'
    prefix_0[0] = 1 if s[0] == '0' else 0
    prefix_1[0] = 1 if s[0] == '1' else 0
    for i in range(1, n):
        prefix_0[i] = prefix_0[i-1] + (1 if s[i] == '0' else 0)
        prefix_1[i] = prefix_1[i-1] + (1 if s[i] == '1' else 0)
    
    total_0 = prefix_0[-1]
    total_1 = prefix_1[-1]
    count = 0
    
    # Try each position as middle building
    for j in range(1, n-1):
        if s[j] == '0':
            left_1 = prefix_1[j-1]
            right_1 = total_1 - prefix_1[j]
            count += left_1 * right_1
        else: # s[j] == '1'
            left_0 = prefix_0[j-1]
            right_0 = total_0 - prefix_0[j]
            count += left_0 * right_0

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each prefix is computed in O(n), and a single pass over s for the mid-point selection is O(n).
- **Space Complexity:** O(n), due to prefix arrays. Could be reduced to O(1) by tracking counts in real-time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are asked for the number of ways to select k buildings, all alternating types?  
  *Hint: Consider dynamic programming with states tracking the number selected and last type.*

- Can you do this with O(1) extra space instead of prefix arrays?  
  *Hint: Keep running left counts while filling from left to right.*

- How would you handle a very large input, e.g., streamed input?  
  *Hint: Only maintain aggregate counts and update on the go.*

### Summary
This problem is an example of prefix sum and counting pattern usage, a common and effective technique for problems involving subarray/subsequence queries in linear time. It applies a “fix-middle and count valid left/right pairs” strategy seen in problems with triple (or k-tuple) pattern selection, and the prefix approach is broadly applicable to interval and pattern-matching tasks.


### Flashcard
For each middle building, count valid triplets by multiplying prefix and suffix counts of the required alternating characters.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
