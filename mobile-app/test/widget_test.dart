// Basic Flutter widget test for BusLink User App

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:buslink_user/main.dart';

void main() {
  testWidgets('App launches successfully', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const BusLinkApp());

    // Verify that the app renders the onboarding screen.
    expect(find.text('In your city, at your'), findsOneWidget);
  });
}
