import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/back_button.dart';

enum SearchType { location, destination }

class SearchLocationScreen extends StatefulWidget {
  final SearchType searchType;

  const SearchLocationScreen({super.key, required this.searchType});

  @override
  State<SearchLocationScreen> createState() => _SearchLocationScreenState();
}

class _SearchLocationScreenState extends State<SearchLocationScreen> {
  final _searchController = TextEditingController();

  final List<Map<String, dynamic>> _recentLocations = [
    {
      'name': 'Telibandha Chowk',
      'address': 'Raipur, Chhattisgarh',
      'isStop': true,
    },
    {'name': 'Janta Hotel', 'address': 'Raipur, Chhattisgarh', 'isStop': false},
    {
      'name': 'Raipur Railway Station',
      'address': 'Raipur, Chhattisgarh',
      'isStop': true,
    },
    {
      'name': 'Ambuja City Center, Mowa',
      'address': 'Raipur, Chhattisgarh',
      'isStop': true,
    },
    {'name': 'Ghadhi Chowk', 'address': 'Raipur, Chhattisgarh', 'isStop': true},
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isLocation = widget.searchType == SearchType.location;

    return Scaffold(
      backgroundColor: AppTheme.backgroundLight,
      body: SafeArea(
        child: Column(
          children: [
            // Search header
            Container(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  BackButtonWidget(onPressed: () => Navigator.pop(context)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 10,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: TextField(
                        controller: _searchController,
                        autofocus: true,
                        decoration: InputDecoration(
                          hintText: isLocation
                              ? 'Enter your location'
                              : 'Enter your destination',
                          hintStyle: TextStyle(color: AppTheme.textGrey),
                          border: InputBorder.none,
                          suffixIcon: const Icon(
                            Icons.search,
                            color: AppTheme.primaryBlue,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Options
            if (isLocation)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  children: [
                    _buildOptionTile(
                      icon: Icons.my_location,
                      title: 'Your location',
                      onTap: () {
                        Navigator.pop(context, 'Current Location');
                      },
                    ),
                    _buildOptionTile(
                      icon: Icons.map_outlined,
                      title: 'Choose on map',
                      onTap: () {
                        // TODO: Implement map picker
                      },
                    ),
                  ],
                ),
              )
            else
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: _buildOptionTile(
                  icon: Icons.map_outlined,
                  title: 'Choose on map',
                  onTap: () {
                    // TODO: Implement map picker
                  },
                ),
              ),
            const Divider(height: 32),
            // Recents header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Recents',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textDark,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            // Recent locations list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _recentLocations.length,
                itemBuilder: (context, index) {
                  final location = _recentLocations[index];
                  return _buildLocationTile(
                    name: location['name'],
                    address: location['address'],
                    isStop: location['isStop'],
                    onTap: () {
                      Navigator.pop(context, location['name']);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionTile({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: AppTheme.primaryBlue.withOpacity(0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: AppTheme.primaryBlue),
      ),
      title: Text(
        title,
        style: const TextStyle(
          fontWeight: FontWeight.w500,
          color: AppTheme.textDark,
        ),
      ),
      onTap: onTap,
    );
  }

  Widget _buildLocationTile({
    required String name,
    required String address,
    required bool isStop,
    required VoidCallback onTap,
  }) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(vertical: 4),
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: AppTheme.lightBlue.withOpacity(0.5),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(
          isStop ? Icons.flag_outlined : Icons.location_on_outlined,
          color: AppTheme.primaryBlue,
        ),
      ),
      title: Text(
        name,
        style: const TextStyle(
          fontWeight: FontWeight.w600,
          color: AppTheme.textDark,
        ),
      ),
      subtitle: Text(
        address,
        style: TextStyle(color: AppTheme.textGrey, fontSize: 12),
      ),
      onTap: onTap,
    );
  }
}
