### Leetcode 1010 (Medium): Pairs of Songs With Total Durations Divisible by 60 [Practice](https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60)

### Description  
Given a list of song durations (in seconds), find the number of pairs (i, j), with i < j, such that the sum of time[i] and time[j] is divisible by 60. In other words, for each pair, (time[i] + time[j]) % 60 == 0. The order of the original list matters for indices but not for the result, and each song can be used in multiple pairs as long as the indices are unique.

### Examples  

**Example 1:**  
Input: `time = [30,20,150,100,40]`  
Output: `3`  
Explanation:  
Pairs are:
- (time=30, time[2]=150) → 180, divisible by 60  
- (time[1]=20, time[3]=100) → 120, divisible by 60  
- (time[1]=20, time[4]=40) → 60, divisible by 60

**Example 2:**  
Input: `time = [60,60,60]`  
Output: `3`  
Explanation:  
All three pairs (0,1), (0,2), (1,2) sum to 120, which is divisible by 60.

**Example 3:**  
Input: `time = [10,50,90,30]`  
Output: `2`  
Explanation:  
Pairs:
- (time=10, time[1]=50) → 60  
- (time[2]=90, time[3]=30) → 120

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible pairs (i < j), check if (time[i] + time[j]) % 60 == 0. This is O(n²), which is too slow for large input.
- **Optimized approach:**  
  - Use the modulo property: For each song, calculate the remainder r = time[i] % 60.
  - To form a valid pair, look for existing songs with remainder (60 - r) % 60.
  - Keep a count of how many times each remainder has appeared so far.
  - For each song, add to the total the count of songs with the required complement remainder.
  - Update the current remainder count.
  - Special cases:  
    - For r == 0 and r == 30, pairing is with the same remainder, so handle those with combination formula (n × (n - 1) / 2)[2][3].
  - This is an O(n) solution.

### Corner cases to consider  
- Input array is empty or has only 1 element → 0 pairs.
- All times are multiples of 60.
- No pairs possible (e.g., all times are primes not forming a 60 multiple).
- Duplicate song durations.
- Large input size (time length up to 60,000).

### Solution

```python
def numPairsDivisibleBy60(time):
    # Array to store count of remainders mod 60
    remainder_count = [0]*60
    pairs = 0
    for t in time:
        r = t % 60
        # Find complement remainder to make sum divisible by 60
        complement = (60 - r) % 60
        pairs += remainder_count[complement]
        remainder_count[r] += 1
    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of songs. We loop through the array once.
- **Space Complexity:** O(1), since the remainder_count array size is always 60 (constant), regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to count triplets where the sum is divisible by 60?  
  *Hint: Can you generalize the two-sum approach to three-sum, and what constraints would you have on counts and combinations?*

- What if the divisor is variable (not always 60)?  
  *Hint: Abstract with a parameter, use modulo with the given value instead of 60.*

- How do you return the actual pairs instead of just the count?  
  *Hint: Track indices for each remainder, then enumerate pairs as needed; consider space impact.*

### Summary
This problem is a classic example of the "two sum with a twist" pattern, where you use modulo (remainder) to reduce the search for complementing elements. Maintaining a running count of remainders lets you find pairings in linear time and constant space. This pattern is also useful for any problem involving subarrays or pairs with sums divisible by a given integer.


### Flashcard
For each song, count remainder mod 60; for remainder r, add count of (60−r) mod 60 seen so far to total pairs.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Destroy Sequential Targets(destroy-sequential-targets) (Medium)
- Count Pairs That Form a Complete Day II(count-pairs-that-form-a-complete-day-ii) (Medium)