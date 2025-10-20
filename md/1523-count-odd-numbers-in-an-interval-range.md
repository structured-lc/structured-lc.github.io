### Leetcode 1523 (Easy): Count Odd Numbers in an Interval Range [Practice](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range)

### Description  
Given two non-negative integers, **low** and **high**, count how many *odd* numbers exist in the inclusive interval [low, high].  
For example, if low=3 and high=7, the function should return how many numbers in [3,7] are odd (3, 5, 7).

### Examples  

**Example 1:**  
Input: `low = 3, high = 7`  
Output: `3`  
*Explanation: Odd numbers in [3,7] are 3, 5, and 7 — so the answer is 3.*

**Example 2:**  
Input: `low = 8, high = 10`  
Output: `1`  
*Explanation: Only 9 is odd in [8, 10], so the answer is 1.*

**Example 3:**  
Input: `low = 1, high = 1`  
Output: `1`  
*Explanation: 1 is odd and lies in [1,1], so there is 1 odd number.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to iterate from **low** to **high**, checking if each number is odd and counting if so — but this is too slow for large ranges.

Observing patterns:
- Odd numbers occur every other number.
- For any integer k, the count of odd numbers ≤ k is ⌊(k+1)/2⌋.
- To find the count in the interval [low, high], subtract the count before low:
  - Count of odds in [0, high]: ⌊(high+1)/2⌋
  - Count of odds in [0, low-1]: ⌊low/2⌋
  - So, answer is: ⌊(high+1)/2⌋ - ⌊low/2⌋

This approach is **O(1)** and only requires integer division.

### Corner cases to consider  
- The range is a single number (low == high).
- low and high are both even, both odd, or one even / one odd.
- Very large values (like 0 and \(10^9\)).
- low = 0 (lowest allowed value).

### Solution

```python
def count_odds(low: int, high: int) -> int:
    # Count of odds up to high is (high + 1) // 2
    # Count of odds up to (low - 1) is low // 2
    return (high + 1) // 2 - (low // 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only a few simple arithmetic operations, no loops.
- **Space Complexity:** O(1) — No auxiliary storage, only input and constant space variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the *sum* of odd numbers in the interval instead of the count?  
  *Hint: You can find the first and last odd in the range and use arithmetic progression formula.*

- How would you modify your code to count *even* numbers in the interval?  
  *Hint: Total count - count of odd numbers, or apply a similar formula for even numbers.*

- If the interval represents a subarray in an array of values, and you want to count odds, how would the approach change?  
  *Hint: Would need to iterate, unless preprocessing is done for quick lookup.*

### Summary
The main insight is recognizing the pattern that odd numbers appear every other number, letting us count odds in O(1) time by computing ⌊(high+1)/2⌋ - ⌊low/2⌋.  
This is a classic *math trick* and is commonly seen in interval counting problems, not just for odds but for any regularly spaced property.  
The pattern is useful for any task where you want to count elements matching a modulus over an interval.


### Flashcard
Count odd numbers in a range by using the formula ⌊(high+1)/2⌋ - ⌊low/2⌋.

### Tags
Math(#math)

### Similar Problems
- Check if Bitwise OR Has Trailing Zeros(check-if-bitwise-or-has-trailing-zeros) (Easy)