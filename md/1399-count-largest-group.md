### Leetcode 1399 (Easy): Count Largest Group [Practice](https://leetcode.com/problems/count-largest-group)

### Description  
Given an integer n, group the numbers from 1 to n by the sum of their digits. Return the number of groups (sums) that have the largest size.

### Examples  
**Example 1:**  
Input: `n = 13`  
Output: `4`
*Explanation: Sums {1,2,3,4,5,6,7,8,9,1+0=1,1+1=2,1+2=3,1+3=4} => Group sizes: 1(2x),2(2x),3(2x),4(2x),5(1x),6(1x),7(1x),8(1x),9(1x). Max group size: 2, number of such groups: 4 ({1,2,3,4}).*

**Example 2:**  
Input: `n = 2`
Output: `2`
*Explanation: sum(1)=1, sum(2)=2, both groups size 1, both equally largest.*

**Example 3:**  
Input: `n = 15`
Output: `6`
*Explanation: Sums: group sizes: {1(2),2(2),3(2),4(2),5(2),6(1),7(1),8(1),9(1)}. Largest size 2, occurs for 6 groups.*

### Thought Process (as if you’re the interviewee)  
- Go from 1 to n, for each x, find its digit sum, and count occurrences per sum
- Then find the maximum group size, and count how many different sums get that size
- Simple for-loop solution

### Corner cases to consider  
- n < 10 (single digit numbers)
- n is large (e.g. 10,000)
- Multiple group sizes tie for largest

### Solution

```python
def countLargestGroup(n):
    from collections import defaultdict
    count = defaultdict(int)
    for num in range(1, n+1):
        s = sum(int(d) for d in str(num))
        count[s] += 1
    max_group = max(count.values())
    return sum(1 for v in count.values() if v == max_group)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n ⋅ d), d=number of digits, which is O(log n) worst case.
- **Space Complexity:** O(n), for count map (number of digit sums <= 81 for n ≤ 10⁴).

### Potential follow-up questions (as if you’re the interviewer)  
- What if n is extremely large (10⁸)?  
  *Hint: Find formula/count for digit sums rather than enumerating all.*

- Can you output the largest groups themselves (lists of numbers)?  
  *Hint: Keep arrays/sets of numbers per sum, not just their counts.*

- What if the digit sum function is replaced by another function?  
  *Hint: Make digit function parameterized.*

### Summary
This is a digit grouping/frequency problem, easy to solve via counting hashmap. Counting by digit sum is a pattern for number grouping questions.


### Flashcard
For 1 to n, count digit sums, find max group size, return number of sums with that size.

### Tags
Hash Table(#hash-table), Math(#math)

### Similar Problems
