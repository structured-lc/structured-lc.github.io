### Leetcode 2260 (Medium): Minimum Consecutive Cards to Pick Up [Practice](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up)

### Description  
Given an integer array **cards**, where cards[i] is the value of the iᵗʰ card in a row of face-down cards, you need to find the minimum number of consecutive cards to pick up so that at least two of the cards picked up have the same value. If it's impossible to find such a pair, return -1.  
You must return the minimum possible length of such a sequence.

### Examples  

**Example 1:**  
Input: `cards = [3,4,2,3,4,7]`  
Output: `4`  
*Explanation: Pick [3,4,2,3] (indices 0 to 3), which includes the repeated card 3 at index 0 and 3. The distance is 3 - 0 + 1 = 4 cards. [4,2,3,4] (indices 1-4) is also valid of length 4.*

**Example 2:**  
Input: `cards = [1,0,5,3]`  
Output: `-1`  
*Explanation: There is no way to pick consecutive cards such that two cards have the same value.*

**Example 3:**  
Input: `cards = [1,2,1,3,2,2]`  
Output: `2`  
*Explanation: The last two cards [2,2] (indices 4 and 5) are a pair with the minimum window size 2.*

### Thought Process (as if you’re the interviewee)  
- My first instinct is a brute-force approach: for every possible pair of equal cards in the array, record the smallest window between their indices. But this would require O(n²) time, which is not efficient for large input.
- To optimize, I'll use a hash map to store the *last seen index* of each card value as I iterate through the array. 
- When I see a card value that’s already in the map:
    - Compute the window size from the last occurrence to current index: (current index - last index + 1).
    - Keep updating the minimum such value found.
- This way, we search for the smallest window with two equal values in O(n) time and O(k) space (k = number of unique cards).
- This approach is similar to the sliding window and “Longest Substring Without Repeating Characters” patterns.

### Corner cases to consider  
- Array contains only unique elements — should return -1.
- Array has a pair right next to each other, e.g. [1,2,2], so answer is 2.
- Multiple pairs exist; ensure we pick the *minimum* window, not just the first.
- Array of size 1 — should return -1.
- Array has pair at ends, e.g. [2,1,2] — window includes the whole array.

### Solution

```python
def minimumCardPickup(cards):
    # Hash map to store the last index at which each card value was seen
    last_seen = dict()
    # Start with an answer larger than max possible window
    min_length = len(cards) + 1
    
    for i, value in enumerate(cards):
        if value in last_seen:
            # Compute window size: current index - last_seen index + 1
            window = i - last_seen[value] + 1
            min_length = min(min_length, window)
        # Update (or set) the last seen index for this card value
        last_seen[value] = i
    
    # If the min_length was not updated, no pair exists
    return min_length if min_length <= len(cards) else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the cards array once and each map operation is O(1).
- **Space Complexity:** O(k), where k is the number of unique card values seen (stored in the hash map). In the worst case, k ≈ n.

### Potential follow-up questions (as if you’re the interviewer)  

- If the cards array is too large to fit in memory, how would you solve it?  
  *Hint: Can you use external memory or streaming techniques?*

- What if you need to return not just the length but the actual indices of the window?  
  *Hint: Track indices of the minimum window as well as its length.*

- How would you handle the case where pairs can be in non-consecutive windows (i.e., not consecutive cards)?  
  *Hint: Current problem is for consecutive, but in general, you’d want only index difference.*

### Summary
This problem uses the **sliding window** and **hash map** pattern to record last occurrences and efficiently find minimum windows containing duplicates. It’s a classic application of processing an array with lookups for quick detection of repeated elements within dynamic window boundaries—very common in substring or subarray problems involving "first repeat" or "minimum window" computations.


### Flashcard
Track last seen index of each card with a hash map; for each card, update the minimum window between current and last index.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)